import "../styles/expense-page.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getBudgets, createBudget } from "../services/budget/budget.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ExpenseList from "../components/expense/ExpenseList";
import ExpenseForm from "../components/expense/ExpenseForm";
import BudgetList from "../components/expense/BudgetList";
import BudgetForm from "../components/expense/BudgetForm";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../services/category/category.service";

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction
} from "../services/transaction/transaction.service";

// ===== TYPES =====
type Category = {
  id: number;
  name: string;
  colorCode: string;
};

// ===== TYPES =====
type Transaction = {
  id: number;
  amount: number;
  label: string;
  date: string;
  category: {
    id: number;
    name: string;
    colorCode: string;
  };
};

export default function ExpensePage() {
  // ===== STATE =====
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showBudget, setShowBudget] = useState(false);

  const [newCategory, setNewCategory] = useState("");

  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");

  const [selectedBudgetCategoryId, setSelectedBudgetCategoryId] = useState<number | "">("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const [budgets, setBudgets] = useState<any[]>([]);
  const [alertEnabled, setAlertEnabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [label, setLabel] = useState("");

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [expenseDate, setExpenseDate] = useState<Date | null>(new Date());
  // ===== LOAD =====
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editingTransaction) {
      setNewExpenseAmount(editingTransaction.amount.toString());
      setSelectedCategoryId(editingTransaction.category.id);
      setLabel(editingTransaction.label || "");
      setExpenseDate(
        editingTransaction.date ? new Date(editingTransaction.date) : new Date()
      );
      setShowAddExpense(true);
    }
  }, [editingTransaction]);

  useEffect(() => {
    if (editingBudget) {
      setSelectedBudgetCategoryId(editingBudget.id);

      if (editingBudget.budget) {
        setBudgetAmount(editingBudget.budget.limit.toString());
        setAlertEnabled(editingBudget.budget.alertEnabled);
      }

      setShowBudget(true);
    }
  }, [editingBudget]);


  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const catData = await getCategories();
      setCategories(catData.categories);

      const transData = await getTransactions();
      setTransactions(transData.transactions);

      const budgetData = await getBudgets();
      setBudgets(budgetData.budgets);
    } catch (err) {
      console.error(err);
      setError("Erreur chargement des données");
    } finally {
      setLoading(false);
    }
  }

  // ===== MERGE DATA (IMPORTANT) =====
  const mergedCategories = categories.map((cat) => {
    const budget = budgets.find((b) => b.category === cat.name);

    // 🔥 calcul des dépenses réelles
    const spent = transactions
      .filter((t) => t.category?.name === cat.name)
      .reduce((sum, t) => sum + t.amount, 0);

    // 🔥 calcul pourcentage
    const percent =
      budget && budget.limit > 0 ? (spent / budget.limit) * 100 : 0;

    return {
      ...cat,
      budget: budget || null,
      spent,
      percent,
    };
  });

  // ===== CATEGORY =====
  async function handleAddCategory() {
    if (!newCategory) return;

    try {
      setLoading(true);
      await createCategory(newCategory);
      setNewCategory("");
      await loadData();
    } catch {
      setError("Erreur création catégorie");
    } finally {
      setLoading(false);
    }
  }

  // ===== EXPENSE =====
  async function handleSaveExpense() {
    if (!newExpenseAmount || !selectedCategoryId) {
      setError("Montant et catégorie obligatoires");
      return;
    }

    if (!expenseDate) {
      setError("La date est obligatoire");
      return;
    }

    // normaliser les dates sans l'heure
    const selectedDate = new Date(expenseDate);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      setError("Date invalide");
      return;
    }

    if (selectedDate > today) {
      setError("La date ne peut pas être dans le futur");
      return;
    }

    if (selectedDate < oneMonthAgo) {
      setError("La date ne peut pas dépasser 1 mois");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        categoryId: Number(selectedCategoryId),
        amount: Number(newExpenseAmount),
        label: label || "Dépense",
        date: selectedDate.toISOString(),
      };

      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, payload);
      } else {
        await createTransaction(payload);
      }

      setEditingTransaction(null);
      setNewExpenseAmount("");
      setSelectedCategoryId("");
      setLabel("");
      setExpenseDate(new Date());
      setShowAddExpense(false);

      await loadData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteExpense(id: number) {
    try {
      setLoading(true);
      await deleteTransaction(id);
      await loadData();
    } catch {
      setError("Erreur suppression dépense");
    } finally {
      setLoading(false);
    }
  }

  // ===== BUDGET =====
  async function handleSaveBudget() {
    if (!selectedBudgetCategoryId || !budgetAmount) return;

    try {
      setLoading(true);

      await createBudget({
        categoryId: Number(selectedBudgetCategoryId),
        limit: Number(budgetAmount),
        alertEnabled: alertEnabled,
      });

      // reset
      setEditingBudget(null);
      setSelectedBudgetCategoryId("");
      setBudgetAmount("");
      setAlertEnabled(true);
      setShowBudget(false);

      await loadData();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Header />

      <main className="expense-page">
        {loading && <p style={{ textAlign: "center" }}>Chargement...</p>}

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <div className="expense-container">

          {/* ===== HISTORIQUE ===== */}
          <section className="expense-card">
            <h2 className="card-title">Ajouter une dépense</h2>

            <div className="card-footer">
              <button
                className="primary-button"
                onClick={() => setShowAddExpense(!showAddExpense)}
              >
                + Ajouter une dépense
              </button>
            </div>

            {showAddExpense && (
              <div className="form">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategoryId(value ? Number(value) : "");
                  }}
                >
                  <option value="">-- Choisir catégorie --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  placeholder="Montant"
                />

                {/* ✅ DATE */}
                <DatePicker
                  selected={expenseDate}
                  onChange={(date: Date | null) => setExpenseDate(date)}
                  maxDate={new Date()}
                  minDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
                  dateFormat="dd/MM/yyyy"
                  className="custom-datepicker"
                />

                <div className="form-actions">



                  <button onClick={() => setShowAddExpense(false)}>
                    Annuler
                  </button>
                  <button
                    className="primary-button"
                    onClick={handleSaveExpense}
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}

            <h2 className="card-title" style={{ marginTop: "20px" }}>
              Historique des dépenses
            </h2>

            <div className="expense-list">
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className="expense-row"
                  style={{
                    borderLeft: `5px solid ${t.category?.colorCode || "#ccc"}`,
                    paddingLeft: "10px",
                  }}
                >

                  <span>{t.category?.name}</span>
                  <span>{t.amount} €</span>
                  <span>{new Date(t.date).toLocaleDateString()}</span>

                  <div className="actions">
                    <button onClick={() => handleDeleteExpense(t.id)}>❌</button>
                    <button onClick={() => setEditingTransaction(t)}>✏️</button>
                  </div>

                </div>
              ))}
            </div>
          </section>

          {/* ===== BUDGET PAR CATEGORIE ===== */}
          <section className="expense-card">
            <h2 className="card-title">Configurer un budget</h2>

            <div className="card-footer">
              <button
                className="primary-button"
                onClick={() => setShowBudget(!showBudget)}
              >
                Configurer budget
              </button>
            </div>

            {showBudget && (
              <div className="form">
                <select
                  value={selectedBudgetCategoryId}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedBudgetCategoryId(value ? Number(value) : "");
                  }}
                >
                  <option value="">-- Choisir catégorie --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Montant max"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />

                <label style={{ display: "flex", gap: "10px" }}>
                  Activer alerte
                  <input
                    type="checkbox"
                    checked={alertEnabled}
                    onChange={(e) => setAlertEnabled(e.target.checked)}
                  />
                </label>

                <div className="form-actions">
                  <button onClick={() => setShowBudget(false)}>
                    Annuler
                  </button>

                  <button
                    className="primary-button"
                    onClick={handleSaveBudget}
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}

            <h2 className="card-title" style={{ marginTop: "20px" }}>
              Budget par catégorie
            </h2>

            <div className="expense-list">

              <div className="budget-header">
                <span>Catégorie</span>
                <span>Budget</span>
                <span>Dépensé</span>
                <span>Statut</span>
                <span>Actions</span>
              </div>

              {mergedCategories.map((cat) => {
                const hasBudget = !!cat.budget;

                return (
                  <div key={cat.id} className="budget-row">


                    <span
                      className="budget-col"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: cat.colorCode || "#ccc",
                        }}
                      />

                      {cat.name}
                    </span>

                    <span className="budget-col">
                      {hasBudget ? `${cat.budget.limit} €` : "-"}
                    </span>

                    <span className="budget-col">
                      {cat.spent} €
                    </span>

                    <span className="budget-col status">
                      {hasBudget &&
                        cat.budget.alertEnabled &&
                        cat.percent >= 80 &&
                        cat.percent < 100 && (
                          <span className="warning">⚠️ 80%</span>
                        )}

                      {hasBudget &&
                        cat.budget.alertEnabled &&
                        cat.percent >= 100 && (
                          <span className="danger">🔴 Dépassé</span>
                        )}
                    </span>

                    <div className="budget-col actions">
                      <button onClick={() => setEditingBudget(cat)}>✏️</button>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
import "../styles/expense-page.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getBudgets, createBudget } from "../services/budget/budget.service";

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
};

type Transaction = {
  id: number;
  amount: number;
  label: string;
  category: {
    id: number;
    name: string;
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

  // ===== LOAD =====
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editingTransaction) {
      setNewExpenseAmount(editingTransaction.amount.toString());
      setSelectedCategoryId(editingTransaction.category.id);
      setLabel(editingTransaction.label || "");
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
    if (!newExpenseAmount || !selectedCategoryId) return;

    try {
      setLoading(true);

      if (editingTransaction) {
        // 🔥 UPDATE
        await updateTransaction(editingTransaction.id, {
          categoryId: Number(selectedCategoryId),
          amount: Number(newExpenseAmount),
          label: label || "Dépense",
          date: new Date().toISOString(),
        });
      } else {
        // CREATE
        await createTransaction({
          categoryId: Number(selectedCategoryId),
          amount: Number(newExpenseAmount),
          label: label || "Dépense",
          date: new Date().toISOString(),
        });
      }

      // reset
      setEditingTransaction(null);
      setNewExpenseAmount("");
      setSelectedCategoryId("");
      setLabel("");
      setShowAddExpense(false);

      await loadData(); // 🔥 important

    } catch (err: any) {
      setError(err.message);
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
                <div key={t.id} className="expense-row">
                  <span>{t.category?.name}</span>
                  <span>{t.amount} €</span>

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

                    <span className="budget-col">{cat.name}</span>

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
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
} from "../services/expense/expense.service";

// ===== TYPES =====
type Category = {
  id: number;
  name: string;
};

type Transaction = {
  id: number;
  amount: number;
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

  // ===== LOAD =====
  useEffect(() => {
    loadData();
  }, []);

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

  async function handleDeleteCategory(id: number) {
    try {
      setLoading(true);
      await deleteCategory(id);
      await loadData();
    } catch {
      setError("Erreur suppression catégorie");
    } finally {
      setLoading(false);
    }
  }

  // ===== EXPENSE =====
  async function handleAddExpense() {
    if (!newExpenseAmount || !selectedCategoryId) return;

    try {
      setLoading(true);
      setError("");

      await createTransaction({
        categoryId: Number(selectedCategoryId),
        amount: Number(newExpenseAmount),
        label: label || "Dépense",
        date: new Date().toISOString(),
      });

      setNewExpenseAmount("");
      setSelectedCategoryId("");
      setLabel("");
      setShowAddExpense(false);

      await loadData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur ajout dépense");
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
  async function handleAddBudget() {
    if (!selectedBudgetCategoryId || !budgetAmount) return;

    try {
      setLoading(true);

      await createBudget({
        categoryId: Number(selectedBudgetCategoryId),
        limit: Number(budgetAmount),
        alertEnabled: alertEnabled,
      });

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
            <h2 className="card-title">Historique des dépenses</h2>

            <div className="expense-list">
              {transactions.map((t) => (
                <div key={t.id} className="expense-row">
                  <span>{t.category?.name}</span>
                  <span>{t.amount} €</span>

                  <div className="actions">
                    <button onClick={() => handleDeleteExpense(t.id)}>
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

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
                    onClick={handleAddExpense}
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ===== BUDGET PAR CATEGORIE ===== */}
          <section className="expense-card">
            <h2 className="card-title">Budget par catégorie</h2>

            <div className="expense-list">
              {mergedCategories.map((cat) => {
                const hasBudget = !!cat.budget;

                return (
                  <div key={cat.id} className="expense-row">

                    {/* catégorie */}
                    <span>{cat.name}</span>

                    {/* budget */}
                    <span>
                      {hasBudget ? `${cat.budget.limit} €` : "-"}
                    </span>

                    {/* dépensé */}
                    {hasBudget && (
                      <span style={{ opacity: 0.7 }}>
                        {cat.spent} €
                      </span>
                    )}

                    {/* alert 80% */}
                    {hasBudget &&
                      cat.budget.alertEnabled &&
                      cat.percent >= 80 &&
                      cat.percent < 100 && (
                        <span style={{ color: "orange" }}>
                          ⚠️ 80%
                        </span>
                      )}

                    {/* alert 100% */}
                    {hasBudget &&
                      cat.budget.alertEnabled &&
                      cat.percent >= 100 && (
                        <span style={{ color: "red" }}>
                          🔴 Dépassé
                        </span>
                      )}

                    <div className="actions">
                      <button onClick={() => handleDeleteCategory(cat.id)}>
                        ❌
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

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
                    onClick={handleAddBudget}
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}
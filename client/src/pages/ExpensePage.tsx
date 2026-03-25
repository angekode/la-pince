import "../styles/expense-page.css";
import Header from "../components/Header";
import { useState } from "react";

export default function ExpensePage() {

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showBudget, setShowBudget] = useState(false);

  return (
    <>
      <Header />

      <main className="expense-page">
        <div className="expense-container">

          {/* ===== BLOC 1 ===== */}
          <section className="expense-card">
            <h2 className="card-title">Historique des dépenses</h2>

            <div className="expense-list">
              <div className="expense-row">
                <span>Courses</span>
                <span>45 €</span>
              </div>
              <div className="expense-row">
                <span>Transport</span>
                <span>20 €</span>
              </div>
              <div className="expense-row">
                <span>Loisir</span>
                <span>60 €</span>
              </div>
            </div>

            <div className="card-footer">
              <button
                className="primary-button"
                onClick={() => setShowAddExpense(!showAddExpense)}
              >
                + Ajouter une dépense
              </button>
            </div>

            {/* 👉 FORMULAIRE DEPENSE */}
            {showAddExpense && (
              <div className="form">
                <input placeholder="Nom (ex: Courses)" />
                <input type="number" placeholder="Montant (€)" />

                <div className="form-actions">
                  <button onClick={() => setShowAddExpense(false)}>
                    Annuler
                  </button>
                  <button className="primary-button">
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ===== BLOC 2 ===== */}
          <section className="expense-card">
            <h2 className="card-title">Budget par catégorie</h2>

            <div className="expense-list">
              <div className="expense-row">
                <span>Courses</span>
                <span>300 €</span>
              </div>
              <div className="expense-row">
                <span>Transport</span>
                <span>150 €</span>
              </div>
              <div className="expense-row">
                <span>Loisir</span>
                <span>200 €</span>
              </div>
            </div>

            <div className="card-footer">
              <button
                className="primary-button"
                onClick={() => setShowBudget(!showBudget)}
              >
                Configurer
              </button>
            </div>

            {/* 👉 FORMULAIRE BUDGET */}
            {showBudget && (
              <div className="form">
                <input placeholder="Catégorie" />
                <input type="number" placeholder="Budget (€)" />

                <div className="form-actions">
                  <button onClick={() => setShowBudget(false)}>
                    Annuler
                  </button>
                  <button className="primary-button">
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
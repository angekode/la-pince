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

          {/* BLOC 1 */}
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
              <button className="primary-button"
              onClick={() => setShowAddExpense(true)}>
                + Ajouter une dépense
              </button>
            </div>
          </section>

          {/* BLOC 2 */}
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
              <button className="primary-button"
              onClick={() => setShowBudget(true)}>
                Configurer
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* POPUP AJOUT DEPENSE */}
{showAddExpense && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Ajouter une dépense</h3>

      <input placeholder="Nom (ex: Courses)" />
      <input type="number" placeholder="Montant (€)" />

      <div className="modal-actions">
        <button onClick={() => setShowAddExpense(false)}>
          Annuler
        </button>
        <button className="primary-button">
          Ajouter
        </button>
      </div>
    </div>
  </div>
)}


{showBudget && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Configurer budget</h3>

      <input placeholder="Catégorie" />
      <input type="number" placeholder="Budget (€)" />

      <div className="modal-actions">
        <button onClick={() => setShowBudget(false)}>
          Annuler
        </button>
        <button className="primary-button">
          Sauvegarder
        </button>
      </div>
    </div>
  </div>
)}
    </>

    
  );
}


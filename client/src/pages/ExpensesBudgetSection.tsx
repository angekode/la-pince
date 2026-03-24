/**
 * ExpensesBudgetSection.tsx
 * ------------------------------------------------------------
 * Ce composant représente la section "Budgets" dans la page
 * Dépenses. Il affiche :
 *
 *  - Le formulaire de création de budget
 *  - La liste des budgets existants
 *  - Le formulaire de mise à jour d’un budget sélectionné
 *
 * Chaque ligne est commentée pour faciliter la compréhension
 * par un développeur qui découvre le projet.
 */

import { useEffect, useState } from "react";

// Import des services API
import { getBudgets } from "../services/budget/budget.service";
import { getCategories } from "../services/categories/categories.service";

// Import des composants
import BudgetFormCreate from "../components/budget/BudgetFormCreate";
import BudgetFormUpdate from "../components/budget/BudgetFormUpdate";
import BudgetCard from "../components/budget/BudgetCard";

// Types locaux
type Category = { id: number; name: string };
type Budget = { id: number; montant_limite: number; id_categorie: number };

function ExpensesBudgetSection() {
  /**
   * ------------------------------------------------------------
   * ÉTATS LOCAUX
   * ------------------------------------------------------------
   */

  // Liste des budgets existants
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Liste des catégories (pour affichage dans les cartes)
  const [categories, setCategories] = useState<Category[]>([]);

  // Budget sélectionné pour modification
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  /**
   * ------------------------------------------------------------
   * CHARGEMENT DES DONNÉES AU MONTAGE
   * ------------------------------------------------------------
   */
  useEffect(() => {
    // Charge les budgets depuis l’API
    getBudgets().then(setBudgets);

    // Charge les catégories depuis l’API
    getCategories().then(setCategories);
  }, []);

  /**
   * ------------------------------------------------------------
   * FONCTION : rafraîchir les budgets après création / mise à jour
   * ------------------------------------------------------------
   */
  const refreshBudgets = () => {
    getBudgets().then(setBudgets);
  };

  /**
   * ------------------------------------------------------------
   * RENDU DU COMPOSANT
   * ------------------------------------------------------------
   */
  return (
    <section className="expenses-budget-section">

      {/* --------------------------------------------------------
          FORMULAIRE DE CRÉATION DE BUDGET
         -------------------------------------------------------- */}
      <BudgetFormCreate
        categories={categories}          // Liste des catégories
        onBudgetCreated={refreshBudgets} // Callback après création
      />

      {/* --------------------------------------------------------
          LISTE DES BUDGETS EXISTANTS
         -------------------------------------------------------- */}
      <div className="budget-list">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}               // Données du budget
            categories={categories}       // Pour afficher le nom de la catégorie
            onEdit={() => setSelectedBudget(budget)} // Sélection pour modification
          />
        ))}
      </div>

      {/* --------------------------------------------------------
          FORMULAIRE DE MISE À JOUR (si un budget est sélectionné)
         -------------------------------------------------------- */}
      {selectedBudget && (
        <BudgetFormUpdate
          budget={selectedBudget}         // Budget à modifier
          categories={categories}         // Liste des catégories
          onBudgetUpdated={() => {
            refreshBudgets();             // Rafraîchit la liste
            setSelectedBudget(null);      // Ferme le formulaire
          }}
          onCancel={() => setSelectedBudget(null)} // Annule la modification
        />
      )}
    </section>
  );
}

export default ExpensesBudgetSection;


/**
 * BudgetCard.tsx
 * ------------------------------------------------------------
 * Ce composant représente une carte affichant un budget existant.
 *
 * Il affiche :
 *  - Le nom de la catégorie
 *  - Le montant limite
 *  - Un indicateur de couleur selon l’état du budget
 *  - Un bouton pour modifier le budget
 *
 * Chaque ligne est commentée pour faciliter la compréhension.
 */

import React from "react";

// Types locaux
type Category = { id: number; name: string };
type Budget = { id: number; montant_limite: number; id_categorie: number };

type Props = {
  budget: Budget;                 // Données du budget
  categories: Category[];         // Liste des catégories
  onEdit: () => void;             // Callback pour ouvrir le formulaire de modification
};

function BudgetCard({ budget, categories, onEdit }: Props) {
  /**
   * ------------------------------------------------------------
   * RÉCUPÉRATION DU NOM DE LA CATÉGORIE
   * ------------------------------------------------------------
   * On cherche dans la liste des catégories celle qui correspond
   * à l'id_categorie du budget.
   */
  const category = categories.find((c) => c.id === budget.id_categorie);

  /**
   * ------------------------------------------------------------
   * CALCUL DE LA COULEUR D’ÉTAT DU BUDGET
   * ------------------------------------------------------------
   * Ici, on n’a pas les dépenses par catégorie dans ce composant,
   * donc on affiche uniquement la couleur neutre (vert).
   *
   * Si tu veux afficher une vraie couleur dynamique, il faudra
   * passer les dépenses en props.
   */
  const statusClass = "budget-green";

  /**
   * ------------------------------------------------------------
   * RENDU DE LA CARTE
   * ------------------------------------------------------------
   */
  return (
    <div className="budget-card">
      {/* Nom de la catégorie */}
      <h3>{category ? category.name : "Catégorie inconnue"}</h3>

      {/* Montant limite */}
      <p>
        Montant limite :{" "}
        <span className={statusClass}>{budget.montant_limite} €</span>
      </p>

      {/* Bouton modifier */}
      <button onClick={onEdit} style={{ marginTop: "10px" }}>
        Modifier
      </button>
    </div>
  );
}

export default BudgetCard;


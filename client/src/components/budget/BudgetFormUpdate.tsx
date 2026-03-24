/**
 * BudgetFormUpdate.tsx
 * ------------------------------------------------------------
 * Ce composant affiche le formulaire permettant de modifier
 * un budget existant.
 *
 * Il reçoit :
 *  - Le budget à modifier
 *  - La liste des catégories
 *  - Un callback onBudgetUpdated() pour rafraîchir la liste
 *  - Un callback onCancel() pour fermer le formulaire
 *
 * Chaque ligne est commentée pour faciliter la compréhension.
 */

import { useState } from "react";
import { updateBudget } from "../../services/budget/budget.service";

// Types locaux
type Category = { id: number; name: string };
type Budget = { id: number; montant_limite: number; id_categorie: number };

type Props = {
  budget: Budget;                // Budget sélectionné pour modification
  categories: Category[];        // Liste des catégories
  onBudgetUpdated: () => void;   // Callback après mise à jour
  onCancel: () => void;          // Callback pour fermer le formulaire
};

function BudgetFormUpdate({ budget, categories, onBudgetUpdated, onCancel }: Props) {
  /**
   * ------------------------------------------------------------
   * ÉTATS LOCAUX
   * ------------------------------------------------------------
   * On initialise les champs avec les valeurs du budget existant.
   */

  const [montantLimite, setMontantLimite] = useState(budget.montant_limite);
  const [categorieId, setCategorieId] = useState(budget.id_categorie);

  /**
   * ------------------------------------------------------------
   * FONCTION : soumettre le formulaire
   * ------------------------------------------------------------
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Envoie les données modifiées au backend
    await updateBudget(budget.id, {
      montant_limite: montantLimite,
      id_categorie: categorieId,
    });

    // Rafraîchit la liste des budgets
    onBudgetUpdated();
  };

  /**
   * ------------------------------------------------------------
   * RENDU DU FORMULAIRE
   * ------------------------------------------------------------
   */
  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <h3>Modifier le budget</h3>

      {/* Sélecteur de catégorie */}
      <label>Catégorie</label>
      <select
        value={categorieId}
        onChange={(e) => setCategorieId(Number(e.target.value))}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Champ montant limite */}
      <label>Montant limite (€)</label>
      <input
        type="number"
        value={montantLimite}
        onChange={(e) => setMontantLimite(Number(e.target.value))}
      />

      {/* Boutons d'action */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={onCancel} style={{ background: "#777" }}>
          Annuler
        </button>
      </div>
    </form>
  );
}

export default BudgetFormUpdate;



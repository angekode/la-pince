/**
 * BudgetFormCreate.tsx
 * ------------------------------------------------------------
 * Ce composant affiche le formulaire permettant de créer
 * un nouveau budget.
 *
 * Il reçoit :
 *  - La liste des catégories
 *  - Un callback onBudgetCreated() pour rafraîchir la liste
 *
 * Chaque ligne est commentée pour faciliter la compréhension.
 */

import { useState } from "react";
import { createBudget } from "../../services/budget/budget.service";

// Types locaux
type Category = { id: number; name: string };

type Props = {
  categories: Category[];          // Liste des catégories disponibles
  onBudgetCreated: () => void;     // Callback après création
};

function BudgetFormCreate({ categories, onBudgetCreated }: Props) {
  /**
   * ------------------------------------------------------------
   * ÉTATS LOCAUX
   * ------------------------------------------------------------
   * On stocke les valeurs saisies dans le formulaire.
   */

  const [montantLimite, setMontantLimite] = useState<number>(0);
  const [categorieId, setCategorieId] = useState<number>(
    categories.length > 0 ? categories[0].id : 0
  );

  /**
   * ------------------------------------------------------------
   * FONCTION : soumettre le formulaire
   * ------------------------------------------------------------
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Envoie les données au backend
    await createBudget({
      montant_limite: montantLimite,
      id_categorie: categorieId,
    });

    // Rafraîchit la liste des budgets
    onBudgetCreated();

    // Réinitialise le formulaire
    setMontantLimite(0);
  };

  /**
   * ------------------------------------------------------------
   * RENDU DU FORMULAIRE
   * ------------------------------------------------------------
   */
  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <h3>Créer un budget</h3>

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

      {/* Bouton de validation */}
      <button type="submit">Créer</button>
    </form>
  );
}

export default BudgetFormCreate;


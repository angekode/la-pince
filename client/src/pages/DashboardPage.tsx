/**
 * Page principale du dashboard.
 * Affiche :
 *  - les indicateurs globaux (bloc 1)
 *  - les indicateurs par catégorie + choix du graphique (bloc 2)
 *  - le graphique (bloc 3)
 */

import { useState, useEffect, useMemo } from "react";

// Import des composants graphiques
import PieGraph from "../components/dashboard/PieGraph";
import BarGraph from "../components/dashboard/BarGraph";
import CurveGraph from "../components/dashboard/CurveGraph";

// Import des services API
import { getMe } from "../services/auth/auth.service";
import { getCategories } from "../services/categories/categories.service";
import { getBudgets } from "../services/budget/budget.service";
import { getTransactions } from "../services/transactions/transactions.service";
import { getSolde } from "../services/graphs/graphs-data.service";

// Header
import Header from "../components/Header";

// Types locaux
type Category = { id: number; name: string };
type Budget = { id: number; montant_limite: number; id_categorie: number };
type Transaction = { id: number; amount: number; categoryId: number };

function DashboardPage() {

  // Stocke l'utilisateur connecté
  const [user, setUser] = useState<any>(undefined);

  // Stocke les catégories disponibles
  const [categories, setCategories] = useState<Category[]>([]);

  // Stocke les budgets par catégorie
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Stocke toutes les transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Stocke le solde global
  const [solde, setSolde] = useState(0);

  // Catégorie sélectionnée dans le filtre
  const [selectedCategoryId, setSelectedCategoryId] = useState<"all" | number>("all");

  // Type de graphique sélectionné (camembert, barres, courbe)
  const [graphType, setGraphType] = useState<"pie" | "bar" | "curve">("pie");

  /**
   * Charge toutes les données nécessaires au dashboard
   * au montage du composant.
   */
  useEffect(() => {
    getMe().then(setUser);
    getCategories().then(setCategories);
    getBudgets().then(setBudgets);
    getTransactions().then(setTransactions);
    getSolde().then(setSolde);
  }, []);

  /**
   * Calcule le budget total (somme des budgets par catégorie)
   */
  const totalBudget = useMemo(
    () => budgets.reduce((sum, b) => sum + b.montant_limite, 0),
    [budgets]
  );

  /**
   * Calcule les dépenses totales (somme des transactions)
   */
  const totalSpent = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  /**
   * Calcule le reste global
   */
  const totalRemaining = totalBudget - totalSpent;

  /**
   * Pourcentage global de dépenses
   */
  const globalPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  /**
   * Détermine la couleur du rectangle d’alerte global
   */
  const globalAlertClass =
    globalPercent < 79
      ? "alert-green"
      : globalPercent < 100
      ? "alert-orange"
      : "alert-red";

  /**
   * Récupère le budget de la catégorie sélectionnée
   */
  const selectedBudget = useMemo(() => {
    if (selectedCategoryId === "all") return undefined;
    return budgets.find((b) => b.id_categorie === selectedCategoryId);
  }, [budgets, selectedCategoryId]);

  /**
   * Calcule les dépenses de la catégorie sélectionnée
   */
  const selectedSpent = useMemo(() => {
    if (selectedCategoryId === "all") return 0;
    return transactions
      .filter((t) => t.categoryId === selectedCategoryId)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions, selectedCategoryId]);

  /**
   * Calcule le reste pour la catégorie sélectionnée
   */
  const selectedRemaining = selectedBudget
    ? selectedBudget.montant_limite - selectedSpent
    : 0;

  /**
   * Pourcentage de dépenses pour la catégorie sélectionnée
   */
  const selectedPercent = selectedBudget
    ? (selectedSpent / selectedBudget.montant_limite) * 100
    : 0;

  /**
   * Détermine la couleur du rectangle d’alerte catégorie
   */
  const selectedAlertClass =
    selectedPercent < 79
      ? "alert-green"
      : selectedPercent < 100
      ? "alert-orange"
      : "alert-red";

  return (
    <>
      {/* Affiche le header */}
      <Header />

      <main className="dashboard__main">

        {/* BLOC 1 — Indicateurs globaux */}
        <section className="dashboard__indicators-section">

          <div className="dashboard__indicators-row">
            <div className="dashboard__indicator">
              <h3>Budget total</h3>
              <p>{totalBudget}€</p>
            </div>

            <div className="dashboard__indicator">
              <h3>% dépenses globales</h3>
              <p>{globalPercent.toFixed(0)}%</p>
            </div>

            <div className="dashboard__indicator">
              <h3>Solde</h3>
              <p>{totalRemaining}€</p>
            </div>
          </div>

          {/* Rectangle d’alerte global */}
          <div className={`dashboard__alert-bar ${globalAlertClass}`}></div>
        </section>

        {/* BLOC 2 — Catégorie + indicateurs + choix du graphique */}
        <section className="dashboard__main-block">

          {/* Ligne : filtre catégorie + icônes */}
          <div className="dashboard__category-row">

            {/* Filtre catégorie */}
            <div className="dashboard__category-select">
              <label>Catégorie</label>
              <select
                value={selectedCategoryId}
                onChange={(e) =>
                  setSelectedCategoryId(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Icônes de sélection du type de graphique */}
            <div className="dashboard__graph-icons">
              <img
                src="/icons/pie.svg"
                className={graphType === "pie" ? "active" : ""}
                onClick={() => setGraphType("pie")}
              />
              <img
                src="/icons/bar.svg"
                className={graphType === "bar" ? "active" : ""}
                onClick={() => setGraphType("bar")}
              />
              <img
                src="/icons/curve.svg"
                className={graphType === "curve" ? "active" : ""}
                onClick={() => setGraphType("curve")}
              />
            </div>
          </div>

          {/* Indicateurs catégorie */}
          <div className="dashboard__category-indicators">
            <div className="dashboard__indicator-small">
              <h4>Budget limite</h4>
              <p>{selectedBudget ? selectedBudget.montant_limite + "€" : "—"}</p>
            </div>

            <div className="dashboard__indicator-small">
              <h4>Dépenses</h4>
              <p>{selectedSpent}€</p>
            </div>

            <div className="dashboard__indicator-small">
              <h4>Reste</h4>
              <p>{selectedRemaining}€</p>
            </div>
          </div>

          {/* Rectangle d’alerte catégorie */}
          <div className="dashboard__alert-block">
            <div className={`dashboard__alert-bar ${selectedAlertClass}`}>
              {selectedCategoryId === "all"
                ? "Budget total"
                : categories.find(c => c.id === selectedCategoryId)?.name}
            </div>
          </div>

        </section>

        {/* BLOC 3 — Graphique */}
        <section className="dashboard__graph-section">

          {graphType === "pie" && <PieGraph />}
          {graphType === "bar" && <BarGraph categoryId={selectedCategoryId} />}
          {graphType === "curve" && <CurveGraph categoryId={selectedCategoryId} />}

        </section>

      </main>
    </>
  );
}

export default DashboardPage;



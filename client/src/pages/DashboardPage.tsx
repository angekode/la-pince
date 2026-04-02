/**************************************************************
 * DashboardPage
 * ------------------------------------------------------------
 * Page structurée en deux colonnes :
 *
 *  - Colonne gauche (300px fixe) :
 *      • Sélecteur de catégorie
 *      • Icônes de sélection de graphique
 *      • Indicateurs de la catégorie sélectionnée
 *      • Alerte catégorie
 *
 *  - Colonne droite (≈ 3× plus large) :
 *      • Indicateurs globaux
 *      • Alerte globale
 *      • Graphique sélectionné
 *
 * Ce composant gère :
 *  - le chargement des données (API)
 *  - les calculs globaux et par catégorie
 *  - la sélection du type de graphique
 *
 * Le style est défini dans dashboard-page.css.
 
 * Cette page affiche un tableau de bord financier structuré en
 * trois blocs principaux :
 *
 *  BLOC B — Indicateurs globaux (global)
 *  BLOC A — Informations par catégorie (left)
 *  BLOC C — Graphiques (graph)
 *
 * Le DOM est volontairement organisé dans cet ordre :
 *
 *    <section class="dashboard-global">   ← B
 *    <aside class="dashboard-left">       ← A
 *    <section class="dashboard-graph">    ← C
 *
 * Cela permet un contrôle total de l’ordre en mobile via CSS.
 *
 * Le layout desktop est ensuite reconstruit via CSS Grid pour
 * obtenir la disposition 2 colonnes :
 *
 *    ┌───────────────┬──────────────────────────┐
 *    │     A         │            B             │
 *    │               ├──────────────────────────┤
 *    │               │            C             │
 *    └───────────────┴──────────────────────────┘
 **************************************************************/

import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

// Graphiques
import PieGraph from "../components/dashboard/PieGraph";
import BarGraph from "../components/dashboard/BarGraph";
import CurveGraph from "../components/dashboard/CurveGraph";

// Services API
import { getMe } from "../services/auth/auth.service";
import {
  getCategories,
  type Category,
} from "../services/category/category.service";
import { getBudgets, type Budget } from "../services/budget/budget.service";
import {
  getTransactions,
  type Transaction,
} from "../services/transaction/transaction.service";
import { getSolde } from "../services/graphs/graphs-data.service";

// UI
import Header from "../components/Header";
import GraphIcons from "../components/GraphIcons";

type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

function DashboardPage() {
  /**************************************************************
   * États : données API
   **************************************************************/
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  /**************************************************************
   * États : affichage
   **************************************************************/
  const [selectedCategoryId, setSelectedCategoryId] = useState<"all" | number>(
    "all",
  );

  const [graphType, setGraphType] = useState<"pie" | "bar" | "curve">("pie");

  const location = useLocation();

  /**************************************************************
   * Chargement des données
   * → se relance à chaque fois qu'on revient sur /dashboard
   **************************************************************/
  // ===== LOAD =====

  useEffect(() => {
    async function loadData() {
      try {
        await getMe();

        const categoriesData = await getCategories();
        setCategories(categoriesData.categories);

        const budgetsData = await getBudgets();
        setBudgets(budgetsData.budgets);

        const transactionsData = await getTransactions();
        setTransactions(transactionsData.transactions);

        await getSolde();
      } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error(`Erreur à la récupération des données: ${errorMsg}`);
      }
    }

    loadData();
  }, [location.pathname]); // Se relance à chaque navigation vers /dashboard

  /**************************************************************
   * Calculs globaux
   **************************************************************/
  const totalBudget = useMemo(
    () => budgets.reduce((sum, b) => sum + b.limit, 0) ?? 0,
    [budgets],
  );

  const totalSpent = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0) ?? 0,
    [transactions],
  );

  const totalRemaining = totalBudget - totalSpent;

  const globalPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const globalAlertClass =
    globalPercent < 79
      ? "alert-green"
      : globalPercent < 100
        ? "alert-orange"
        : "alert-red";

  /**************************************************************
   * Calculs pour la catégorie sélectionnée
   **************************************************************/
  const selectedBudget = useMemo(() => {
    if (selectedCategoryId === "all") return undefined;
    return budgets.find((b) => /*b.id_categorie*/ 0 === selectedCategoryId);
  }, [budgets, selectedCategoryId]);

  const selectedSpent = useMemo(() => {
    if (selectedCategoryId === "all") return 0;
    return (
      transactions
        .filter((t) => t.categoryId === selectedCategoryId)
        .reduce((sum, t) => sum + t.amount, 0) ?? 0
    );
  }, [transactions, selectedCategoryId]);

  const selectedRemaining = selectedBudget
    ? selectedBudget.limit - selectedSpent
    : 0;

  const selectedPercent = selectedBudget
    ? (selectedSpent / selectedBudget.limit) * 100
    : 0;

  const selectedAlertClass =
    selectedPercent < 79
      ? "alert-green"
      : selectedPercent < 100
        ? "alert-orange"
        : "alert-red";

  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    getMe().then((value) => setUser(value));
  }, []);

  /**************************************************************
   * Rendu principal
   **************************************************************/
  return (
    <>
      <Header />

      <div className="dashboard-layout">
        {/*********************** BLOC B — GLOBAL ************************/}
        <section className="dashboard-global">
          <div className="dashboard-global__row">
            <div>
              <h3>Budget total</h3>
              <p>{totalBudget}€</p>
            </div>

            <div>
              <h3>% dépenses globales</h3>
              <p>{globalPercent.toFixed(0)}%</p>
            </div>

            <div>
              <h3>Solde</h3>
              <p>{totalRemaining}€</p>
            </div>
          </div>

          <div className={`dashboard-global__alert ${globalAlertClass}`}></div>
        </section>

        {/*********************** BLOC A — CATÉGORIE ************************/}
        <aside className="dashboard-left">
          <h3 className="dashboard-left__title">Catégorie</h3>

          <select
            className="dashboard-left__select"
            value={selectedCategoryId}
            onChange={(e) =>
              setSelectedCategoryId(
                e.target.value === "all" ? "all" : Number(e.target.value),
              )
            }
          >
            <option value="all">Toutes les catégories (budget total)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
         
          <div className="dashboard-left__indicators">
            <div>
              <h4>Budget limite</h4>
              <p>{selectedBudget ? selectedBudget.limit + "€" : "—"}</p>
            </div>

            <div>
              <h4>Dépenses</h4>
              <p>{selectedSpent}€</p>
            </div>

            <div>
              <h4>Reste</h4>
              <p>{selectedRemaining}€</p>
            </div>
          </div>

          <div className={`dashboard-left__alert ${selectedAlertClass}`}>
            {selectedCategoryId === "all"
              ? "Budget total"
              : categories.find((c) => c.id === selectedCategoryId)?.name}
          </div>
        </aside>

        {/*********************** BLOC C — GRAPHIQUES ************************/}
        <section className="dashboard-graph">

          <GraphIcons 
            graphType={graphType} 
            onChange={setGraphType}
            className="graph-icons--small"
            />

          {graphType === "pie" && (
            <PieGraph
              key={`pie-${JSON.stringify(transactions)}`}
              categories={categories}
              transactions={transactions}
              budgets={budgets}
            />
          )}
          {graphType === "bar" && (
            <BarGraph
              key={`bar-${JSON.stringify(transactions)}`}
              categories={categories}
              transactions={transactions}
              budgets={budgets}
            />
          )}
          {graphType === "curve" && (
            <CurveGraph
              key={`curve-${JSON.stringify(transactions)}`}
              categories={categories}
              transactions={transactions}
              budgets={budgets}
            />
          )}

          
        </section>
      </div>
    </>
  );
}

export default DashboardPage;

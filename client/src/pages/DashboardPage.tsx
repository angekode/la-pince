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

// Graphiques
import PieGraph from "../components/dashboard/PieGraph";
import BarGraph from "../components/dashboard/BarGraph";
import CurveGraph from "../components/dashboard/CurveGraph";

// Services API
import { getMe } from "../services/auth/auth.service";
import { getCategories, type GetCategoriesResponse } from "../services/category/category.service";
import { getBudgets, type GetBudgetsResponse } from "../services/budget/budget.service";
import { getTransactions, type GetTransactionsResponse } from "../services/expense/expense.service";
import { getSolde } from "../services/graphs/graphs-data.service";

// UI
import Header from "../components/Header";
import GraphIcons from "../components/GraphIcons";


function DashboardPage() {

  /**************************************************************
   * États : données API
   **************************************************************/
  const [categories, setCategories] = useState<GetCategoriesResponse>();
  const [budgets, setBudgets] = useState<GetBudgetsResponse>();
  const [transactions, setTransactions] = useState<GetTransactionsResponse>();

  /**************************************************************
   * États : affichage
   **************************************************************/
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<"all" | number>("all");

  const [graphType, setGraphType] =
    useState<"pie" | "bar" | "curve">("pie");

  /**************************************************************
   * Chargement initial des données
   **************************************************************/
  useEffect(() => {
    getMe();
    getCategories().then(setCategories);
    getBudgets().then(setBudgets);
    getTransactions().then(setTransactions);
    getSolde();
  }, []);

  /**************************************************************
   * Calculs globaux
   **************************************************************/
  const totalBudget = useMemo(
    () => budgets?.budgets.reduce((sum, b) => sum + b.limit, 0) ?? 0,
    [budgets]
  );

  const totalSpent = useMemo(
    () => transactions?.transactions.reduce((sum, t) => sum + t.amount, 0) ?? 0,
    [transactions]
  );

  const totalRemaining = totalBudget - totalSpent;

  const globalPercent =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

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
    return budgets?.bu.find((b) => /*b.id_categorie*/0 === selectedCategoryId);
  }, [budgets, selectedCategoryId]);

  const selectedSpent = useMemo(() => {
    if (selectedCategoryId === "all") return 0;
    return transactions?.transactions
      .filter((t) => t.categoryId === selectedCategoryId)
      .reduce((sum, t) => sum + t.amount, 0) ?? 0;
  }, [transactions, selectedCategoryId]);

  const selectedRemaining = selectedBudget
    ? selectedBudget.montant_limite - selectedSpent
    : 0;

  const selectedPercent = selectedBudget
    ? (selectedSpent / selectedBudget.montant_limite) * 100
    : 0;

  const selectedAlertClass =
    selectedPercent < 79
      ? "alert-green"
      : selectedPercent < 100
      ? "alert-orange"
      : "alert-red";

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
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
          >
            <option value="all">Toutes les catégories</option>
            {categories?.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <GraphIcons graphType={graphType} onChange={setGraphType} />

          <div className="dashboard-left__indicators">
            <div>
              <h4>Budget limite</h4>
              <p>{selectedBudget ? selectedBudget.montant_limite + "€" : "—"}</p>
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
              : categories?.categories.find((c) => c.id === selectedCategoryId)?.name}
          </div>
        </aside>

        {/*********************** BLOC C — GRAPHIQUES ************************/}
        <section className="dashboard-graph">

          {graphType === "pie" && <PieGraph />}
          {graphType === "bar" && <BarGraph />}
          {graphType === "curve" && <CurveGraph />}

          <div className="dashboard-graph__legend">
            Légendes du graphique
          </div>
        </section>

      </div>
    </>
  );
}

export default DashboardPage;

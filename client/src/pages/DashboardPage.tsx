/**************************************************************
 * DashboardPage
 * ------------------------------------------------------------
 * Page organisée en 2 colonnes :
 *
 *  - Colonne gauche FIXE (300px) contenant :
 *      • Titre "Catégorie"
 *      • Filtre catégorie
 *      • Icônes verticales (GraphIcons)
 *      • Indicateurs de la catégorie sélectionnée
 *      • Barre d’alerte catégorie (centrée, largeur 80%)
 *
 *  - Colonne droite (≈ 3× plus large) contenant :
 *      • Bloc global (indicateurs globaux + alerte globale)
 *      • Bloc graphique (graphique + légendes)
 *
 * La logique métier (calculs, services, types) est intégrée dans ce composant
 * pour simplifier la compréhension et éviter une sur-abstraction prématurée.
 *
 * Les styles sont définis dans un fichier CSS séparé (dashboard-page.css).
 * Ce fichier se concentre sur la structure et l’affichage.
 **************************************************************/

import { useState, useEffect, useMemo } from "react";                          // Import des hooks React

// Import des composants de graphiques
import PieGraph from "../components/dashboard/PieGraph";                       // Composant graphique camembert
import BarGraph from "../components/dashboard/BarGraph";                       // Composant graphique en barres
import CurveGraph from "../components/dashboard/CurveGraph";                   // Composant graphique en courbe

// Import des services pour récupérer les données
import { getMe } from "../services/auth/auth.service";                         // Service : récupération de l’utilisateur
import { getCategories } from "../services/categories/categories.service";     // Service : récupération des catégories
import { getBudgets } from "../services/budget/budget.service";               // Service : récupération des budgets
import { getTransactions } from "../services/transactions/transactions.service"; // Service : récupération des transactions
import { getSolde } from "../services/graphs/graphs-data.service";            // Service : récupération du solde global

// Import du header principal
import Header from "../components/Header";                                     // Composant d’en-tête global

// Import du composant d’icônes de sélection de graphique
import GraphIcons from "../components/GraphIcons";                             // Composant d’icônes de sélection de graphique

// Définition des types locaux pour les données
type Category = { id: number; name: string };                                  // Type : catégorie
type Budget = { id: number; montant_limite: number; id_categorie: number };    // Type : budget par catégorie
type Transaction = { id: number; amount: number; categoryId: number };         // Type : transaction

function DashboardPage() {                                                     // Composant principal de la page Dashboard

/**************************************************************
   * États principaux : données chargées depuis l’API
   **************************************************************/
  const [user, setUser] = useState<any>(undefined);                            // État : utilisateur connecté
  const [categories, setCategories] = useState<Category[]>([]);                // État : liste des catégories
  const [budgets, setBudgets] = useState<Budget[]>([]);                        // État : liste des budgets
  const [transactions, setTransactions] = useState<Transaction[]>([]);         // État : liste des transactions
  const [solde, setSolde] = useState(0);                                       // État : solde global

/**************************************************************
   * États d’affichage : catégorie sélectionnée et type de graphique
**************************************************************/
  const [selectedCategoryId, setSelectedCategoryId] =                          // État : catégorie sélectionnée ("all" ou id)
    useState<"all" | number>("all");

  const [graphType, setGraphType] =                                            // État : type de graphique sélectionné
    useState<"pie" | "bar" | "curve">("pie");

/**************************************************************
   * Chargement initial des données au montage du composant
   **************************************************************/    
  useEffect(() => {                                                            // Effet : chargement initial des données
    getMe().then(setUser);                                                     //   → récupère l’utilisateur
    getCategories().then(setCategories);                                       //   → récupère les catégories
    getBudgets().then(setBudgets);                                             //   → récupère les budgets
    getTransactions().then(setTransactions);                                   //   → récupère les transactions
    getSolde().then(setSolde);                                                 //   → récupère le solde global
  }, []);                                                                      // Exécuté une seule fois au montage

/**************************************************************
   * Calculs globaux : budget total, dépenses, reste, pourcentage
   **************************************************************/
  const totalBudget = useMemo(                                                 // Calcul : budget total (somme des budgets)
    () => budgets.reduce((sum, b) => sum + b.montant_limite, 0),
    [budgets]
  );

  const totalSpent = useMemo(                                                  // Calcul : dépenses totales (somme des transactions)
    () => transactions.reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalRemaining = totalBudget - totalSpent;                             // Calcul : reste global

  const globalPercent =                                                        // Calcul : pourcentage global de dépenses
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const globalAlertClass =
    globalPercent < 79                                                        // Si moins de 79% du budget utilisé
      ? "alert-green"                                                         // Alerte verte
      : globalPercent < 100                                                   // Sinon, si moins de 100%
      ? "alert-orange"                                                        // Alerte orange
      : "alert-red";                                                          // Sinon, alerte rouge (dépassement)

/**************************************************************
   * Calculs pour la catégorie sélectionnée
   **************************************************************/
  const selectedBudget = useMemo(                                              // Calcul : budget de la catégorie sélectionnée
    () => {
      if (selectedCategoryId === "all") return undefined;                      //   → si "all", pas de budget spécifique
      return budgets.find((b) => b.id_categorie === selectedCategoryId);       //   → sinon, on cherche le budget correspondant
    },
    [budgets, selectedCategoryId]
  );

  const selectedSpent = useMemo(                                               // Calcul : dépenses de la catégorie sélectionnée
    () => {
      if (selectedCategoryId === "all") return 0;                              //   → si "all", dépenses spécifiques = 0
      return transactions
        .filter((t) => t.categoryId === selectedCategoryId)                    //   → filtre sur la catégorie
        .reduce((sum, t) => sum + t.amount, 0);                                //   → somme des montants
    },
    [transactions, selectedCategoryId]
  );

  const selectedRemaining = selectedBudget                                     // Calcul : reste pour la catégorie sélectionnée
    ? selectedBudget.montant_limite - selectedSpent
    : 0;

  const selectedPercent = selectedBudget                                       // Calcul : pourcentage de dépenses pour la catégorie
    ? (selectedSpent / selectedBudget.montant_limite) * 100
    : 0;

  const selectedAlertClass =                                                   // Classe d’alerte pour la catégorie sélectionnée
    selectedPercent < 79                                                       // Si moins de 79% du budget utilisé
      ? "alert-green"                                                          // Alerte verte
      : selectedPercent < 100                                                  // Sinon, si moins de 100%
      ? "alert-orange"                                                         // Alerte orange
      : "alert-red";                                                           // Sinon, alerte rouge (dépassement)

  /**************************************************************
   * Rendu principal : layout en 2 colonnes
   **************************************************************/    
  return (                                                                     // Rendu JSX principal
    <>
      <Header />                                                               {/* Affichage du header global */}

      <div className="dashboard-layout">                                       {/* Conteneur principal en 2 colonnes */}
      {/* --------------------------------------------------------
           Colonne gauche (largeur fixe 300px)
           Contient :
           - Titre "Catégorie"
           - Sélecteur de catégorie
           - Icônes de sélection de graphique
           - Indicateurs de la catégorie
           - Barre d’alerte catégorie
           -------------------------------------------------------- */}  

        <aside className="dashboard-left">                                     {/* Colonne gauche (300px fixe) */}

          <h3 className="dashboard-left__title">Catégorie</h3>                 {/* Titre de la colonne gauche */}

          <select
            className="dashboard-left__select"                                 // Select de choix de catégorie
            value={selectedCategoryId}                                         // Valeur liée à l’état selectedCategoryId
            onChange={(e) =>
              setSelectedCategoryId(
                e.target.value === "all" ? "all" : Number(e.target.value)      // Conversion en nombre ou "all"
              )
            }
          >
            <option value="all">Toutes les catégories</option>                         {/* Placeholder par défaut */}
            {categories.map((c) => (                                           // Liste des catégories en options
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <GraphIcons
            graphType={graphType}                                              // Type de graphique actuel
            onChange={setGraphType}                                            // Mise à jour du type de graphique
          />

          <div className="dashboard-left__indicators">                         {/* Indicateurs de la catégorie sélectionnée */}

            <div>
              <h4>Budget limite</h4>
              <p>
                {selectedBudget
                  ? selectedBudget.montant_limite + "€"                        // Affiche le budget limite si disponible
                  : "—"}                                                       {/*  Sinon, tiret*/}
              </p>
            </div>

            <div>
              <h4>Dépenses</h4>
              <p>{selectedSpent}€</p>                                          {/* Affiche les dépenses de la catégorie */}
            </div>

            <div>
              <h4>Reste</h4>
              <p>{selectedRemaining}€</p>                                      {/* Affiche le reste pour la catégorie */}
            </div>

          </div>

          <div className={`dashboard-left__alert ${selectedAlertClass}`}>      {/* Barre d’alerte catégorie (centrée, 80%) */}
            {selectedCategoryId === "all"
              ? "Budget total"                                                 // Si "all", texte générique
              : categories.find((c) => c.id === selectedCategoryId)?.name}     {/* Sinon, nom de la catégorie */}
          </div>

        </aside>

        {/* --------------------------------------------------------
           Colonne droite (≈ 3× plus large que la gauche)
           Contient :
           - Bloc global (indicateurs globaux + alerte)
           - Bloc graphique (graphique + légendes)
           -------------------------------------------------------- */}

        <main className="dashboard-right">                                     {/* Colonne droite (≈ 3× plus large) */}

          <section className="dashboard-global">                               {/* Bloc global : indicateurs + alerte */}

            <div className="dashboard-global__row">                            {/* Ligne des indicateurs globaux */}

              <div>
                <h3>Budget total</h3>
                <p>{totalBudget}€</p>                                          {/* Affiche le budget total */}
              </div>

              <div>
                <h3>% dépenses globales</h3>
                <p>{globalPercent.toFixed(0)}%</p>                             {/* Affiche le pourcentage global */}
              </div>

              <div>
                <h3>Solde</h3>
                <p>{totalRemaining}€</p>                                       {/* Affiche le reste global */}
              </div>

            </div>

            <div className={`dashboard-global__alert ${globalAlertClass}`}></div> {/* Barre d’alerte globale */}
          </section>

          <section className="dashboard-graph">                                {/* Bloc graphique (zone scrollable) */}

            {graphType === "pie" && (                                          // Si type = "pie"
              <PieGraph />                                                     //   → affiche le graphique camembert
            )}

            {graphType === "bar" && (                                          // Si type = "bar"
              <BarGraph categoryId={selectedCategoryId} />                     //   → affiche le graphique en barres
            )}

            {graphType === "curve" && (                                        // Si type = "curve"
              <CurveGraph categoryId={selectedCategoryId} />                   //   → affiche le graphique en courbe
            )}

            <div className="dashboard-graph__legend">                          {/* Zone de légendes du graphique */}
              Légendes du graphique
            </div>

          </section>

        </main>
      </div>
    </>
  );
}

export default DashboardPage;                                                  // Export du composant principal

/**
 * Composant qui affiche un graphique en camembert (pie chart) en 3D.
 * Les données proviennent du backend via getCategoryTotalsForPieGraphData.
 * Highcharts 3D est utilisé pour l'effet de profondeur.
 * Le camembert est volontairement réduit via plotOptions.pie.size.
 */

import { useState, useEffect } from "react";

// Import du composant React qui encapsule Highcharts
import { Chart } from "@highcharts/react";

// Type des options Highcharts
import type { HighchartsOptionsType } from "@highcharts/react";

// Active le module 3D de Highcharts
import "highcharts/esm/highcharts-3d.src.js";

// Service qui récupère les totaux par catégorie
import {
  getCategoryTotalsForPieGraphData,
  type CategoryTotalsData,
} from "../../services/graphs/graphs-data.service";
import type { Budget } from "../../services/budget/budget.service";
import type { Transaction } from "../../services/transaction/transaction.service";
import type { Category } from "../../services/category/category.service";

type PieGraphProps = {
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
};

function PieGraph({ categories, transactions, budgets }: PieGraphProps) {
  // Stocke les données reçues du backend
  const [graphData, setGraphData] = useState<CategoryTotalsData[] | null>(null);

  /**
   * Configuration complète du graphique Highcharts.
   * - chart : type, fond, 3D
   * - series : données du camembert
   * - plotOptions : style du camembert, labels, taille, bordures
   */
  const chartOptions: HighchartsOptionsType = {
    chart: {
      type: "pie", // Type de graphique
      

      backgroundColor: "transparent", // Fond transparent pour s'intégrer au thème
      plotBorderWidth: 0, // Pas de bordure autour du graphique
      options3d: {
        enabled: true, // Active la 3D
        alpha: 45, // Inclinaison verticale
        beta: 0, // Inclinaison horizontale
      },
    },
      legend: { enabled: false },
      credits: { enabled: false },
    // Série principale contenant les données du camembert
    series: [
      {
        name: "categories", // Nom de la série
        data: Array.isArray(graphData)
          ? graphData
              .map((item) => ({ y: item.total, name: item.category }))
              .toSorted((a, b) => -a.y + b.y)
          : [],
      },
    ],

    plotOptions: {
      pie: {
        /**
         * Réduit la taille du camembert.
         * Valeur recommandée : 50% à 70%.
         * Ici : 60% pour un rendu équilibré.
         */
        size: "60%",

        dataLabels: {
          useHTML: true, // Permet d'utiliser des classes CSS personnalisées
          enabled: true, // Active les labels
          formatter: function () {
            // Format du label
            return `
            <div class="pie-label-box">
              <span class="pie-label-name">${this.name}</span> 
              <span class="pie-label-value">${this.y?.toFixed(0)} €</span>
            </div>
            `;
          },
        },

        borderColor: "#171a21", // Bordure du camembert
        borderWidth: 2, // Épaisseur de la bordure
        borderRadius: 6, // Arrondis des segments
        depth: 35, // Profondeur 3D
      },

      // Ombre portée sous le camembert
      series: {
        shadow: {
          color: "rgba(0, 0, 0, 1)", // Couleur de l'ombre
          offsetX: 0, // Décalage horizontal
          offsetY: 6, // Décalage vertical
          opacity: 0.05, // Transparence
          width: 10, // Taille de l'ombre
        },
      },
    },
  };

  /**
   * Récupère les données du backend au montage du composant.
   * Le tableau de dépendances vide [] garantit un appel unique.
   */
  useEffect(() => {
    async function load() {
      const data = await getCategoryTotalsForPieGraphData(
        categories,
        transactions,
      );
      setGraphData(data);
    }
    load();
  }, [categories, transactions]);

  if (!Array.isArray(graphData)) return null;

  /**
   * Affiche le graphique Highcharts.
   * Le composant <Chart> se charge de créer et mettre à jour le graphique.
   */
  return <Chart options={chartOptions} />;
}

export default PieGraph;

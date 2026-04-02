/**
 * Affiche une graphique sous forme de de barres qui montre la somme dépensée dans chaque catégorie.
 * A améliorer en ajoutant le niveau de budget maximum par catégorie.
 */

import { useState, useEffect } from "react";

import { Chart } from "@highcharts/react";
import type { HighchartsOptionsType } from "@highcharts/react";
import "highcharts/esm/highcharts-3d.src.js";

import {
  getCategoryTotalsForPieGraphData,
  type CategoryTotalsData,
} from "../../services/graphs/graphs-data.service";
import type { Budget } from "../../services/budget/budget.service";
import type { Transaction } from "../../services/transaction/transaction.service";
import type { Category } from "../../services/category/category.service";

type BarGraphProps = {
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
};

function BarGraph({ categories, transactions, budgets }: BarGraphProps) {
  const [graphData, setGraphData] = useState<CategoryTotalsData[] | null>(null);

  // On configure tout le graphique ici (Données, apparance)
  const chartOptions: HighchartsOptionsType = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
      plotBorderWidth: 0,
      options3d: {
        enabled: true,
        alpha: 20,
        beta: 5,
      },
      shadow: {
        color: "rgba(0, 0, 0, 1)",
        offsetX: 0,
        offsetY: 6,
        opacity: 1,
        width: 10,
      },
    },

    // Apparence de l'axe des catégories
    xAxis: {
      categories: Array.isArray(graphData)
    ? graphData.map(item => item.category)
    : [],
      gridLineWidth: 0,
      labels: {
        useHTML: true, // Pour autoriser l'utilisation des class définie en dessous à partir du css (chart.css)
        formatter: function () {
          return `<span class="bar-axis-label">${this.value}</span>`;
        },
        x: -10, // pour l'éloigner de l'axe
      },
    },
      legend: { enabled: false },
      credits: { enabled: false },
    // Apparence
    yAxis: {
      title: {
        text: "Montant (€)",
      },
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
    },
    series: [
      {
        type: "bar",
        name: "categories",
        colorByPoint: true,
        data: Array.isArray(graphData)
          ? graphData
              .map((item) => ({ y: item.total, name: item.category }))
              .toSorted((a, b) => -a.y + b.y)
          : [],
      },
    ],
    plotOptions: {
      series: {
        dataLabels: {
          useHTML: true, // pour pourvoir appliquer les css sur les classes
          enabled: true,
          formatter: function () {
            return `<span class="bar-label-value">${this.y?.toFixed(0)} €</span>`;
          },
          x: 10,
        },
        shadow: {
          color: "rgba(0, 0, 0, 1)",
          offsetX: 0,
          offsetY: 6,
          opacity: 0.05,
          width: 10,
        },
      },
    },
  };

  // Lance l'acquisition des données une fois au montage du composant (car tableau des dépendances vide)
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

  return <Chart options={chartOptions} />;
}

export default BarGraph;

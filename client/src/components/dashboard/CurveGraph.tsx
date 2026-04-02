/**
 * Affiche une graphique sous forme de courbe qui montre l'évolution du solde au court du temps.
 * Attention pour l'instant on considère que le solde démarre à 0€ donc on peut avoir des valeurs 
 * négatives.
 */

import { useState, useEffect } from "react";

import { Chart } from '@highcharts/react';
import Highcharts from "highcharts";
import type { HighchartsOptionsType } from '@highcharts/react';
import 'highcharts/esm/highcharts-3d.src.js';

import { getSoldeEvolutionForCurveGraphData, type SoldeEvolutionData } from "../../services/graphs/graphs-data.service";


// Pour traduire en francais l'affichage en anglais par défaut de Highcharts.dateFormat() utilisé
// dans labels.formatter()
Highcharts.setOptions({
  lang: {
    months: [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ],
    weekdays: [
      "dimanche", "lundi", "mardi", "mercredi",
      "jeudi", "vendredi", "samedi"
    ]
  }
});


function CurveGraph() {

  const [graphData, setGraphData] = useState<SoldeEvolutionData>([]);

  // On configure tout le graphique ici (Données, apparance)
  const chartOptions : HighchartsOptionsType = {

    chart: {
      type: "spline",
      backgroundColor: "transparent",
      plotBorderWidth: 0
    },

    // Apparance de l'axe des dates
    xAxis: {
      title: {
        text: "Date"
      },
      labels: {
        useHTML: true, // Pour autoriser l'utilisation des class définie en dessous à partir du css (chart.css)
        formatter: function () {
          return `<span class="curve-xaxis-labels">${Highcharts.dateFormat("%e %B", Number(this.value))}</span>`;
        }
      }
    },

    // Apparance de l'axe du montant du solde
    yAxis: {
      title: {
        text: "Solde (€)",
      },
      labels: {
        useHTML: true,
        formatter: function () { 
          return `<span class="curve-yaxis-labels">${this.value.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €</span>` 
        } 
      }
    },

    // Données du graphique (récupérés par le useEffect)
    series: [
      {
        name: 'solde',
        data: graphData ?? []
      }
    ],

    legend: {
      enabled: false
    },

    title: {
      text: `<span class="curve-title">Evolution du solde</span>`,
      useHTML: true
    }
  };
  
  // Lance l'acquisition des données une fois au montage du composant (car tableau des dépendances vide)
  useEffect(() => { getSoldeEvolutionForCurveGraphData().then(setGraphData) }, []);

  return (
    <Chart options={chartOptions} />
);
}

export default CurveGraph;
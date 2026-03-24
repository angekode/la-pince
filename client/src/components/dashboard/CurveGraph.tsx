import { useState, useEffect } from "react";
import { Chart } from '@highcharts/react';
import Highcharts from "highcharts";
import type { HighchartsOptionsType } from '@highcharts/react';
import 'highcharts/esm/highcharts-3d.src.js';

import { getSoldeEvolution, type SoldeEvolution } from "../../services/graphs/graphs.service";

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

  const [graphData, setGraphData] = useState<SoldeEvolution>([]);

  const chartOptions : HighchartsOptionsType = {
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      plotBorderWidth: 0
    },
    xAxis: {
      type: "datetime",
        dateTimeLabelFormats: {
        month: '%Y'
      },
      title: {
        text: "Date"
      },
      labels: {
        useHTML: true,
        formatter: function () {
          return `<span class="curve-xaxis-labels">${Highcharts.dateFormat("%e %B", Number(this.value))}</span>`;
        }
      }
    },
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
  
  useEffect(() => { getSoldeEvolution().then(setGraphData) }, []);

  return (
    <Chart options={chartOptions} />
);
}

export default CurveGraph;
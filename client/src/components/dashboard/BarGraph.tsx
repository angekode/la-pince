import { useState, useEffect } from "react";
import { Chart } from '@highcharts/react';
import type { HighchartsOptionsType } from '@highcharts/react';
import 'highcharts/esm/highcharts-3d.src.js';

import { getCategoryTotals, type CategoryTotals } from "../../services/graphs/graphs.service";


function BarGraph() {

  const [graphData, setGraphData] = useState<CategoryTotals[]>();

  const chartOptions : HighchartsOptionsType = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
      plotBorderWidth: 0,
      options3d: {
        enabled: true,
        alpha: 20,
        beta: 5
      },
                shadow: {
            color: "rgba(0, 0, 0, 1)",
            offsetX: 0,
            offsetY: 6,
            opacity: 1,
            width: 10
          }
    },
    xAxis: {
      categories: graphData?.map(item => item.category),
      gridLineWidth: 0,
      labels: {
        useHTML: true,
        formatter: function () {
          return `<span class="bar-axis-label">${this.value}</span>`;
        },
        x: -10
      }
    },
    yAxis: {
      title: {
        text: "Montant (€)"
      },
      gridLineWidth: 0,
      labels: {
        enabled: false
      }
    },
    series: [
      {
        type: "bar",
        name: "categories",
        colorByPoint: true,
        data: graphData?.map(item => ({ y: item.total, name: item.category })).toSorted((a, b) => -a.y + b.y)
      }
    ],
    plotOptions: {
      series: {
        dataLabels: {
          useHTML: true, // pour pourvoir appliquer les css sur les classes
          enabled: true,
          formatter: function () {
            return `<span class="bar-label-value">${this.y?.toFixed(0)} €</span>`
          },
          x: 10,
        },
        shadow: {
          color: "rgba(0, 0, 0, 1)",
          offsetX: 0,
          offsetY: 6,
          opacity: 0.05,
          width: 10
        }
      }
    }
  };
  
  useEffect(() => { getCategoryTotals().then(setGraphData) }, []);

  return (
    <Chart options={chartOptions} />
);
}

export default BarGraph;
import { useState, useEffect } from "react";
import { Chart } from '@highcharts/react';
import type { HighchartsOptionsType } from '@highcharts/react';
import 'highcharts/esm/highcharts-3d.src.js';

import { getCategoryTotals, type CategoryTotals } from "../../services/graphs/graphs.service";


function PieGraph() {

  const [graphData, setGraphData] = useState<CategoryTotals[]>();

  const chartOptions : HighchartsOptionsType = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      plotBorderWidth: 0,
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    series: [
      {
        name: 'categories',
        data: graphData?.map(item => ({ y: item.total, name: item.category }))
      }
    ],
    plotOptions: {
      pie: {
        dataLabels: {
          useHTML: true,
          enabled: true,
          formatter: function () {
            return `
            <div class="pie-label-box">
              <span class="pie-label-name">${this.point.name}</span> 
              <span class="pie-label-value">${this.point.y.toFixed(0)} €</span>
            </div>
            `;
          },
        },
        borderColor: "#171a21",
        borderWidth: 2,
        borderRadius: 6,
        depth: 35 // indispensable pour voir la 3D
      },
      series: {
                shadow: {
          color: "rgba(0, 0, 0, 1)",
          offsetX: 0,
          offsetY: 6,
          opacity: 0.05,
          width: 10
        }
      }
    },
  };
  
  useEffect(() => { getCategoryTotals().then(setGraphData) }, []);

  return (
    <Chart options={chartOptions} />
);
}

export default PieGraph;
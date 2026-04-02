import { useEffect, useRef } from "react";
import {
  Chart,
  type HighchartsOptionsType,
  type HighchartsReactRefObject,
} from "@highcharts/react";

type ManagedChartProps = {
  options: HighchartsOptionsType;
};

function ManagedChart({ options }: ManagedChartProps) {
  const chartRef = useRef<HighchartsReactRefObject | null>(null);


  useEffect(() => {
    return () => {
      chartRef.current?.chart?.destroy();
    };
  }, []);

  return <Chart ref={chartRef} options={options} />;
}

export default ManagedChart;

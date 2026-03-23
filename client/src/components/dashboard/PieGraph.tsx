import { useState, useEffect } from "react";

import { getCategoryTotals, type CategoryTotals } from "../../services/graphs/graphs.service";


function PieGraph() {

  const [graphData, setGraphData] = useState<CategoryTotals[]>();
  
  useEffect(() => { getCategoryTotals().then(setGraphData) }, []);

  return (
    <>
      <img src="graph-pie.png"></img> 
      <p>{graphData?.length}</p>
    </>
);
}

export default PieGraph;
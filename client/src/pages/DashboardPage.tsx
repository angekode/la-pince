import { useState } from "react";

import PieGraph from "../components/dashboard/PieGraph";
import BarGraph from "../components/dashboard/BarGraph";


function DashboardPage() {

  const [activeGraph, setActiveGraph] = useState<'pie' | 'bar'>('pie');


  return (
    <>
      <main className="dashboard__main">
        <section className="dashboard__indicators-section">
          <ul>
            <li>Solde <span>456€</span></li>
            <li>% Budget <span>88%</span></li>
            <li>Alertes <em>Budget loisir 120%</em></li>
          </ul>
        </section>
        <section className="dashboard__graphs-section">
          <nav>
            <button onClick={() => setActiveGraph('pie')}>Camembert</button>
            <button onClick={() => setActiveGraph('bar')}>Barres</button>
          </nav>
          <div className="dashboard__graph-view">
            { activeGraph === 'pie' && <PieGraph />}
            { activeGraph === 'bar' && <BarGraph />}
          </div>
        </section>
      </main>
    </>
  );
}

export default DashboardPage;
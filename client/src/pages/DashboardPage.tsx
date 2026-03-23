import PieGraph from "../components/dashboard/PieGraph";
import BarGraph from "../components/dashboard/BarGraph";

import { useState, useEffect } from "react";
import { getMe } from "../services/auth/auth.service";
import { getSolde } from "../services/graphs/graphs.service";

type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

  function DashboardPage() {

  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [solde, setSolde] = useState(0);

  const updateSolde = async () => {
    try {
      setSolde(await getSolde());
    } catch (error) {
      console.error(`Erreur à la récupération du solde : ${error}`);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    getMe()
      .then(setUser)
      .then(updateSolde);
  }, []);



  const [activeGraph, setActiveGraph] = useState<'pie' | 'bar'>('pie');


  return (
    <>
      <main className="dashboard__main">
        <section className="dashboard__indicators-section">
          <ul>
            <li>Solde <span>{solde}€</span></li>
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
import { useState, useEffect } from "react";

import PieGraph from "../components/dashboard/PieGraph";
import BarGraph from "../components/dashboard/BarGraph";
import CurveGraph from "../components/dashboard/CurveGraph";

import { getMe } from "../services/auth/auth.service";
import { getSolde } from "../services/graphs/graphs.service";


type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};


/**
 * Composant DashboardPage.
 * 
 * Doit être utilisé seulement avec un utilisateur connecté.
 * Au montage de ce composant le useEffect est utilisé pour récupérer les infos utilisateur 
 * via /auth/me qui impose d'avoir un token pour s'authentifier.
 */
function DashboardPage() {

  // States
  // ------
  // Infos sur l'utilisateurs disponibles uniquement si connecté sinon undefined
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [solde, setSolde] = useState(0);
  const [activeGraph, setActiveGraph] = useState<'pie' | 'bar' | 'curve'>('pie');

  // Fonctions 
  // ------
  const updateSolde = async () => {
    try {
      setSolde(await getSolde());
    } catch (error) {
      console.error(`Erreur à la récupération du solde : ${error}`);
    }
  };

  // Hooks
  // ------
  // Lancé une seule fois au montage du composant pour récupérer les infos utilisateur
  useEffect(() => {
    getMe()
      .then(setUser)
      .then(updateSolde);
  }, []);


  // Composant retourné
  // ------
  return (
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
          <button onClick={() => setActiveGraph('curve')}>Evolution</button>
        </nav>
        <div className="dashboard__graph-view">
          { activeGraph === 'pie' && <PieGraph />}
          { activeGraph === 'bar' && <BarGraph />}
          { activeGraph === 'curve' && <CurveGraph />}
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
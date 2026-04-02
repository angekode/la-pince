// Import de hooks React nécessaires pour gérer l'état local et les effets secondaires.
// useState permet de stocker des valeurs locales (ici : le thème).
// useEffect permet d'exécuter du code en réaction à un changement d'état.
import { useEffect, useState } from "react";

// Import des composants de routing fournis par react-router-dom.
// Routes est le conteneur global des routes.
// Route permet de définir une route individuelle.
import { Routes, Route } from "react-router-dom";

// Import des pages principales du projet.
// Chaque page correspond à une vue affichée selon l'URL.
import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import Register from "./pages/auth/Register";
import ExpensePage from "./pages/ExpensePage";
import Logout from "./pages/Logout";

// Import des pages légales obligatoires (RGPD, mentions légales, CGU).
import RGPDPage from "./pages/RGPDPage";
import LegalPage from "./pages/LegalPage";
import ConditionsPage from "./pages/ConditionsPage";

// Import de composants transversaux.
// ThemeToggle : bouton permettant de changer le thème (clair/sombre).
// Footer : pied de page affiché sur toutes les pages.
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";

// Import des styles globaux du projet.
// index.css contient probablement les styles de base, variables CSS, resets, etc.
import "./styles/index.css";

// Import d’un service lié aux graphiques.
// Le simple import exécute probablement une initialisation globale.
import "./services/graphs/graphs-data.service"

// Déclaration du composant principal de l'application.
// C'est le point d'entrée de toute l'interface React.
export default function App() {

// Déclaration d'un état local "theme".
  // Il peut prendre deux valeurs : "dark" ou "light".
  // Valeur par défaut : "dark".
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // useEffect est exécuté à chaque fois que "theme" change.
  // Il met à jour la classe du body pour appliquer le thème visuel.
  // Il sauvegarde aussi le thème dans le localStorage pour persistance.
  useEffect(() => {
    document.body.className = theme;          // Applique la classe CSS au body.
    localStorage.setItem("theme", theme);     // Sauvegarde du thème pour les futures sessions.
  }, [theme]); // Dépendance : se déclenche uniquement quand "theme" change.

   // Le return définit l'interface affichée par le composant App.
  // On utilise un fragment <> pour éviter d'ajouter un div inutile.
  return (
    <>
         {/* Définition de toutes les routes de l'application.
          Chaque <Route> associe une URL à un composant React. */} 
      <Routes>

        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Authentification */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />

        {/* Pages internes accessibles après connexion */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<ExpensePage />} />

        {/* Pages légales obligatoires */}
        <Route path="/rgpd" element={<RGPDPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/conditions" element={<ConditionsPage />} />
       
      </Routes>

      {/* Footer affiché sur toutes les pages */}
      <Footer/>
    </>
  );
}
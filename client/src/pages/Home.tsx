import Header from "../components/Header";
import HomeSlide from "../components/HomeSlide";
import "../styles/home.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home-page">

      {/* Header de la page Home */}
      <Header />
      
      <main className="home-main">

        {/* Section présentation des slides */}
        {/*<section id="gestion-budget" className="home-section">*/}
        <section id="visualisation" className="home-section">
          <HomeSlide />
        </section>

        {/* Section Cybersecurité */}
        <section  className="home-section">
          <div className="security-section">
    
            <h2 id="securite">Sécurité Avancé</h2>

            <div className="security-points">
              <p>🔒 Vos données sont chiffrées et protégées.</p>
              <p>🛡️ Connexion sécurisée avec authentification.</p>
              <p>📊 Respect total de votre vie privée.</p>
            </div>

            <div className="security-image">
              <img src="/DesktopShield.png" alt="sécurité" />
            </div>

          </div>
        </section>

        {/* Section proposition d'inscription */}
        <section  className="home-section">
          <div className="signup-section">

            <h2 id="inscription">Alors convaincu ?</h2>

            <p>Inscrivez-vous gratuitement en quelques secondes et commencez à mieux gérer votre budget dès aujourd’hui.</p>

            <button className="primary-button signup-button" onClick={() => navigate("/register")}>
              Créer un compte
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}



export default Home;
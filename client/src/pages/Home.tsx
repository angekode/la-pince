import HeaderHome from "../components/Header-home";
import HomeSlide from "../components/HomeSlide";
import "../styles/home.css"
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>

      {/* Header de la page Home */}
      <HeaderHome />

      <main className="home-main">

        {/* Section présentation des slides */}
        <section id="gestion-budget" className="home-section">
          <HomeSlide />
        </section>

        {/* Section Cybersecurité */}
        <section id="securite" className="home-section">
          <div className="security-section">
    
            <h2>Sécurité Avancé</h2>

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
        <section id="inscription" className="home-section">
          <div className="signup-section">

            <h2>Alors convaincu ?</h2>

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
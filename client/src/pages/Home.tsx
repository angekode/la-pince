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
        {/*<section id="gestion-budget" className="home-section">*/}
        <section id="visualisation" className="home-section">
          <HomeSlide />
        </section>



        {/* Section Cybersecurité */}
        <section  className="home-section">
          {/* Mobile */}
          <div className="security-section-mobile">
    
            <h2 id="securite">Sécurité Avancé</h2>

            <div className="security-points-mobile">
              <p>🔒 Vos données sont chiffrées et protégées.</p>
              <p>🛡️ Connexion sécurisée avec authentification.</p>
              <p>📊 Respect total de votre vie privée.</p>
            </div>

            <div className="security-image-mobile">
              <img src="/DesktopShield.png" alt="sécurité" />
            </div>

          </div>

          {/* Desktop */}
          <div className="security-section-desktop">
            <div className="security-cards">
              <div className="security-card">
                <div className="card-image"><img src="/Hacker.png" alt="sécurité" />
                <div className="card-overlay">
                    <h3>Unifiez votre défense</h3>
                    <p>Défendez votre organisation avec une plateforme unifiée..</p>
                  </div>
                </div> 
              </div>

              <div className="security-card">
                <div className="card-image"><img src="/Shield.png" alt="sécurité" />
                  <div className="card-overlay">
                    <h3>Unifiez votre défense</h3>
                    <p>Défendez votre organisation avec une plateforme unifiée..</p>
                  </div>
                </div>
              </div>

              <div className="security-card">
                <div className="card-image"><img src="/Finger.png" alt="sécurité" />
                  <div className="card-overlay">
                      <h3>Unifiez votre défense</h3>
                      <p>Défendez votre organisation avec une plateforme unifiée..</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Section proposition d'inscription */}
        <section  className="home-section">

          {/* Mobile */}
          <div className="signup-section-mobile">

            <h2 id="inscription">Alors convaincu ?</h2>

            <p>Inscrivez-vous gratuitement en quelques secondes et commencez à mieux gérer votre budget dès aujourd’hui.</p>

            <button className="primary-button signup-button" onClick={() => navigate("/register")}>
              Créer un compte
            </button>
          </div>

          {/* Desktop */}
          <div className="signup-section-desktop">

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
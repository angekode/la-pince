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
          <section id="visualisation" className="home-section">

            {/* Mobile */}
            <HomeSlide />


            {/* Desktop */}
            <div className="home-desktop">
              {/* Bloc gauche */}
              <div className="home-desktop__content">
                {/*<p>{window.innerWidth}px</p>*/}
                <h2>Visualisez vos finances en un instant</h2>
                <p>
                  Gardez une vue claire sur vos revenus, vos dépenses et votre budget.
                  Analysez vos données en temps réel pour mieux comprendre votre situation financière.
                </p>

                <p>
                  Prenez des décisions plus sereines au quotidien grâce à une interface simple,
                  intuitive et accessible sur tous vos appareils.
                </p>
              </div>

              {/* Bloc droit */}
              <div className="home-desktop__visual">
                
                {/* Desktop */}
                <div className="home-desktop__screen">
                  <img src="/home-desktop.png" alt="Application sur ordinateur" />
                </div>

                {/* Smartphone */}
                <div className="home-desktop__phone">
                  <img src="/home-mobile.png" alt="Application sur smartphone" />
                </div>

              </div>
            </div>
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
                      <h3>Protégez vos données sensibles</h3>
                      <p>Assurez la confidentialité de vos informations avec des mécanismes avancés de protection et de chiffrement.</p>
                    </div>
                  </div> 
                </div>

                <div className="security-card">
                  <div className="card-image"><img src="/Shield.png" alt="sécurité" />
                    <div className="card-overlay">
                      <h3>Unifiez votre défense</h3>
                      <p>Centralisez vos outils de sécurité sur une seule plateforme pour détecter, analyser et répondre plus rapidement aux menaces.</p>
                    </div>
                  </div>
                </div>

                <div className="security-card">
                  <div className="card-image"><img src="/Finger.png" alt="sécurité" />
                    <div className="card-overlay">
                        <h3>Surveillez en temps réel</h3>
                        <p>Gardez un œil constant sur votre système grâce à une surveillance continue et des alertes instantanées en cas d’activité suspecte.</p>
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
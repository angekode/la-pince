import HeaderHome from "../components/Header-home";

function Home() {
  return (
    <div>
      <HeaderHome />

      <main className="home-main">
        <section id="gestion-budget" className="home-section">
          <h2>Gestion de budget</h2>
          <p>Contenu de la section gestion de budget.</p>
        </section>

        <section id="visualisation" className="home-section">
          <h2>Visualisation</h2>
          <p>Contenu de la section visualisation.</p>
        </section>

        <section id="securite" className="home-section">
          <h2>Sécurité</h2>
          <p>Contenu de la section sécurité.</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
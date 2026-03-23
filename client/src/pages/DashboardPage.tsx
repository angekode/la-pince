function DashboardPage() {
  return (
    <>
      <header>Header</header>
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
            <a href="">Visuel 1</a>
            <a href="">Visuel 2</a>
            <a href="">Visuel 3</a>
          </nav>
          <div className="dashboard__graph-view">
            <img src="graph-pie.png"></img>
          </div>
        </section>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default DashboardPage;
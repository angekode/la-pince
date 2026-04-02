import Header from "../components/Header";


function LegalPage() {
  return (
    <>
      <Header />
      <main className="infos-page__main">

        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>Le site La Pince est édité dans le cadre d’un projet pédagogique fictif par Nicolas, Medhi, Khouloud et Kahouter, étudiants de l’école O’Clock Phoenix. Ce site a été réalisé à des fins de formation et d’apprentissage dans le cadre d’un projet de développement web.</p>

        <h2>Nature du projet</h2>
        <p>La Pince est une application web de gestion des dépenses personnelles développée dans un cadre pédagogique. Le site ne constitue pas, à ce stade, l’activité commerciale d’une société ou d’un professionnel immatriculé. Le projet est présenté comme un exercice de formation et de mise en pratique des compétences techniques acquises par ses auteurs.</p>

        <h2>Contact</h2>
        <p>Les auteurs du projet peuvent être contactés via leurs profils GitHub respectifs :</p>
        <ul>
          <li><a href="https://github.com/KhouloudEssaidi">Khouloud Essaidi</a></li> |
          <li><a href="https://github.com/Kaouther-FERCHICHI">Kaouther Ferchichi</a></li> |
          <li><a href="https://github.com/angekode">Nicolas Gigot</a></li> |
          <li><a href="https://github.com/ShinTakeshiK">Medhi Marchal</a></li>
        </ul>

        <h2>Hébergement</h2>
        <p>Le site est hébergé par <a href="https://render.com">Render</a>. La base de données utilisée par l’application est hébergée par <a href="https://neon.com">Neon</a>. Les services d’hébergement et d’infrastructure technique sont fournis par ces prestataires tiers.</p>

        <h2>Propriété intellectuelle</h2>
        <p>L’ensemble des contenus présents sur le site, notamment les textes, éléments visuels, interfaces, graphismes, illustrations, logos éventuels, ainsi que le code source, relèvent du travail réalisé dans le cadre du projet pédagogique La Pince. Toute reproduction, représentation, adaptation ou exploitation non autorisée de tout ou partie du site est interdite, sauf autorisation préalable des auteurs ou dispositions légales contraires.</p>

        <h2>Données personnelles</h2>
        <p>Le site peut collecter et traiter certaines données personnelles nécessaires à son fonctionnement. Les modalités de collecte, d’utilisation, de conservation, de suppression et de restitution de ces données sont précisées dans la page dédiée à la politique de confidentialité et au RGPD.</p>

        <h2>Droit applicable</h2>
        <p>Le présent site et ses mentions légales sont soumis au droit français.</p>

      </main>
    </>
  );
}

export default LegalPage;
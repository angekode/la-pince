import Header from "../components/Header";


function RGPDPage() {
  return (
    <>
      <Header />
      <main className="infos-page__main">
        <h1>Politique RGPD</h1>
        <h2>Données collectées</h2>
        <p>Dans le cadre de l’inscription au site, les données suivantes sont collectées : nom, prénom et adresse e-mail. Ces données ont pour finalité de permettre l’identification de chaque utilisateur ainsi que l’isolement de ses données au sein de l’application. Les données relatives aux dépenses financières saisies par un utilisateur enregistré sont également conservées. Ces données comprennent, pour chaque dépense, la date, la description et le montant. Aucune autre donnée n’est stockée dans la base de données.</p>

        <h2>Conservation des données</h2>
        <p>Les données d’inscription sont conservées jusqu’à la suppression du compte utilisateur. Les données relatives aux dépenses sont conservées tant qu’elles ne sont pas supprimées par l’utilisateur ou jusqu’à la suppression du compte. La suppression du compte peut être demandée par l’utilisateur à l’adresse e-mail mentionnée sur la page de contact.</p>

        <h2>Accès, suppression et restitution des données</h2>
        <p>L’ensemble des informations conservées est accessible à l’utilisateur enregistré depuis l’interface du site. L’utilisateur enregistré peut supprimer l’ensemble des données relatives à ses dépenses directement depuis la page des transactions de l’application. Sur demande adressée par e-mail, les données peuvent être restituées dans un format lisible et structuré.</p>

        <h2>Prise de décision automatisée</h2>
        <p>Aucun mécanisme de prise de décision automatisée fondé sur les données collectées n’est mis en oeuvre.</p>

        <h2>Sécurité des données</h2>
        <p>Les données saisies par l’utilisateur sont transmises à la base de données au moyen d’un chiffrement HTTPS. L’authentification repose sur l’utilisation d’un token sécurisé. Aucune information d’authentification sensible n’est gérée directement par la base de données ; ces éléments demeurent sous le contrôle de l’utilisateur. Des mesures de protection sont mises en place contre les attaques de type XSS, CSRF et injection SQL.</p>

        <h2>Isolation des données</h2>
        <p>Un système de gestion des rôles garantit une séparation stricte des données propres à chaque utilisateur.</p>
      </main>
    </>
  );
}

export default RGPDPage;
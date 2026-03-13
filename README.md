# La Pince

## Présentation Générale

- **Quoi ?** Une application web de gestion de finances personnelles.
- **Qui ?** Une société fictive souhaitant proposer un outil simple et intuitif pour aider les particuliers à mieux gérer leur budget.
- **Pour qui ?** Destinée à un public varié (jeunes adultes, familles, étudiants, travailleurs indépendants) souhaitant gérer efficacement leur budget.
- **Comment ?** En équipe à définir (positionnement via un formulaire de voeux) par l'équipe pédagogique. Organisation en méthode agile pour la gestion de projet.
- **Quand ?** En plusieurs sprints qui inclueront des tâches de : conception, code, déploiement, recettage, etc.
- **Pourquoi ?** Pour la réalisation d'un projet fictif à but pédagogique visant l'obtention du Titre Professionnel.

## Présentation du Projet de Développement

### Besoins Fonctionnels (Minimum Viable Product - MVP)

- **Système d'authentification :** inscription, connexion.
- **Suivi des dépenses :** ajout, modification, suppression de dépenses.
- **Création de budgets :** définition de budgets par catégorie (nourriture, factures, sorties, etc.) avec suivi du respect des limites.
- **Alertes de dépenses :** notifications lorsque les dépenses approchent ou dépassent les limites fixées.

### Propositions d’évolutions possibles

- **Tableau de bord :** visualisation graphique de la situation financière globale (dépenses, budget).
- **Gestion de groupes d’utilisateurs :** pour gérer un budget à plusieurs (familles, collocation, etc.).
- **Planification de l'épargne :** définition d'objectifs d'épargne et suivi de la progression.
- **Génération de rapports personnalisés :** dépenses par période, catégorie, etc.
- **Système d’objectifs et de récompenses :** mise en place d'objectifs financiers personnalisés avec récompenses virtuelles (badges).
- **Budget collaboratif :** gestion des permissions pour des budgets partagés en famille ou entre amis (administrateur, lecture seule, contribution).
- **Système de notifications avancé :** alertes personnalisées en temps réel pour les dépenses, les budgets, les objectifs, etc.
- **Intégration d'une API pour la conversion de devises :** pour les voyages ou les achats à l'étranger.
- **Catégorisation intelligente des dépenses :** catégorisation automatique via reconnaissance textuelle simple des intitulés des opérations.
- **Synchronisation bancaire (simulation) :** permettre l’import automatique (via CSV par exemple) des relevés bancaires pour automatiser la saisie des dépenses.
- **Support multilingue :** au moins anglais et français.

### Contraintes Techniques (notamment liées au TP)

- **Technologies** : choix libres mais justifiés.
- **Sécurité :** authentification sécurisée, protection contre les failles courantes (XSS, injections SQL, etc.).
- **Déploiement :** rédaction a minima d'une procédure de déploiement (CI/CD en bonus).
- **Responsive :** application développée en mobile first et responsive.
- **Accessibilité :** respect des normes d'accessibilité web [WCAG](https://www.w3.org/Translations/WCAG20-fr/).
- **RGPD et mentions légales :** mettre en place les mentions légales liées au règlement général sur la protection des données (RGPD).
- **Versionning :** utilisation de Git et GitHub.
- **API** : en consommer au moins une (qu’elle soit interne ou externe). Un seul appel peut être suffisant, l’API ne doit pas forcément être utilisée pour tout le projet.
- **SEO** : appliquer les bonnes pratiques visant à maximiser le référencement du projet.
- **Tests** : plan de tests couvrant les fonctionnalités principales du projet.
- **Conteneurisation (Docker)** : pour l'environnement de développement voire pour le déploiement
- **Démarche d'éco-conception** (optimisation des images, minification des fichiers, etc.).

### Informations & Ressources complémentaires

- Ne pas hésiter à utiliser des contenus “lorem ipsum” au moins le temps d'avoir un MVP fonctionnel.
- Inspirations graphiques possibles : sites web comme [Agicap](https://agicap.com/fr/), etc.

## Pour terminer

- Le projet est libre d'interprétation, l'équipe peut proposer ses propres choix techniques et fonctionnels. Il est donc évolutif et il ne faut pas hésiter à se l'approprier.
- L'accent doit être mis sur l'apprentissage et la mise en pratique des compétences acquises pendant la formation (objectif TP).
- L'équipe pédagogique assure l'accompagnement et conseille tout au long du projet. Elle interviendra aussi lors de la validation des choix techniques et fonctionnels. Elle sera garante de l'évaluation de la progression en vue de se préparer au mieux pour le TP.
- L'équipe pédagogique n'est en aucun cas positionnée en tant que représentante du client fictif du projet proposé.

:arrow_right: [Attendus sur le sprint 0](../.github/ISSUE_TEMPLATE/sp0-suivi-conception.md), dédié à la conception.

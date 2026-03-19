# La Pince – Sprint 0  
_Cahier des charges, conception et éléments graphiques_

---
# Table des matières
- [1. Présentation générale du projet](#1-présentation-générale-du-projet)
  - [1.1 Quoi](#11-quoi)
  - [1.2 Qui](#12-qui)
  - [1.3 Pour qui](#13-pour-qui)
  - [1.4 Comment](#14-comment)
  - [1.5 Quand](#15-quand)
  - [1.6 Pourquoi](#16-pourquoi)
  - [1.7 Contexte détaillé](#17-contexte-détaillé)
- [2. Besoins et objectifs](#2-besoins-et-objectifs)
  - [2.1 Problèmes auxquels répond le projet](#21-problèmes-auxquels-répond-le-projet)
  - [2.2 Objectifs du projet](#22-objectifs-du-projet)
  - [2.3 Résumé du fonctionnement](#23-résumé-du-fonctionnement)
  - [2.4 Exemple d’usage](#24-exemple-dusage)
  - [2.5 Valeur ajoutée](#25-valeur-ajoutée)
  - [2.6 Vision du produit](#26-vision-du-produit)
- [3. Fonctionnalités du projet](#3-fonctionnalités-du-projet)
  - [3.1 MVP – Minimum Viable Product](#31-mvp--minimum-viable-product)
  - [3.2 Évolutions potentielles](#32-évolutions-potentielles)
- [4. Architecture fonctionnelle](#4-architecture-fonctionnelle)
  - [4.1 Parcours utilisateur — Inscription / Connexion / Déconnexion](#41-parcours-utilisateur--inscription--connexion--déconnexion)
  - [4.2 Parcours utilisateur — Ajouter une dépense](#42-parcours-utilisateur--ajouter-une-dépense)
  - [4.3 Parcours utilisateur — Définir une limite de budget](#43-parcours-utilisateur--définir-une-limite-de-budget)
  - [4.4 Parcours utilisateur — Dashboard](#44-parcours-utilisateur--dashboard)
- [5. Architecture du projet](#5-architecture-du-projet)
  - [5.1 Vue d’ensemble](#51-vue-densemble)
  - [5.2 Justification des choix](#52-justification-des-choix)
- [6. Technologies utilisées](#6-technologies-utilisées)
- [7. Cible et contraintes](#7-cible-et-contraintes)
  - [7.1 Cible](#71-cible)
  - [7.2 Contraintes ergonomiques / visuelles](#72-contraintes-ergonomiques--visuelles)
  - [7.3 Navigateurs compatibles](#73-navigateurs-compatibles)
- [8. Arborescence de l’application (front)](#8-arborescence-de-lapplication-front)
- [9. Routes API prévues (backend)](#9-routes-api-prévues-backend)
  - [9.1 Authentification](#91-authentification)
  - [9.2 Catégories](#92-catégories)
  - [9.3 Dépenses](#93-dépenses)
  - [9.4 Budgets](#94-budgets)
- [10. User stories](#10-user-stories)
- [11. Analyse des risques](#11-analyse-des-risques)
- [12. Rôles de l’équipe](#12-rôles-de-léquipe)
- [13. MCD – Modèle Conceptuel de Données](#13-mcd--modèle-conceptuel-de-données)
- [14. MLD – Modèle Logique de Données](#14-mld--modèle-logique-de-données)
- [15. Use Cases](#15-use-cases)
- [16. Diagramme de séquence (description textuelle)](#16-diagramme-de-séquence-description-textuelle)
- [17. Dictionnaire de données](#17-dictionnaire-de-données)
- [18. Wireframe](#18-wireframe)
- [19. Charte graphique](#19charte-graphique)
  - [19.1 Identité visuelle](#191-identité-visuelle)
  - [19.2 Palette de couleurs](#192-palette-de-couleurs)
    - [19.2.1 Couleurs principales](#1921-couleurs-principales)
    - [19.2.2 Couleurs fonctionnelles](#1922-couleurs-fonctionnelles)
    - [19.2.3 Couleurs neutres](#1923-couleurs-neutres)
  - [19.3 Typographies](#193-typographies)
    - [19.3.1 Police principale : Inter](#1931-police-principale--inter)
    - [19.3.2 Police secondaire : Poppins](#1932-police-secondaire--poppins)
  - [19.4 Iconographie](#194-iconographie)
  - [19.5 Style des boutons](#195-style-des-boutons)
    - [19.5.1 Bouton principal (Primary)](#1951-bouton-principal-primary)
    - [19.5.2 Bouton secondaire (Outline)](#1952-bouton-secondaire-outline)
    - [19.5.3 Bouton-dalerte](#1953-bouton-dalerte)
  - [19.6 Style des formulaires](#196-style-des-formulaires)
    - [19.6.1 Champs de saisie](#1961-champs-de-saisie)
    - [19.6.2 Labels](#1962-labels)
    - [19.6.3 Messages derreur](#1963-messages-derreur)
  - [19.7 Style des cartes et sections](#197-style-des-cartes-et-sections)
    - [19.7.1 Cartes](#1971-cartes)
    - [19.7.2 Sections](#1972-sections)
  - [19.8 Logo et déclinaisons](#198-logo-et-déclinaisons)
  - [19.9 Variables CSS](#199-variables-css)
  - [19.10 Figma Tokens (JSON)](#1910-figma-tokens-json)
- [20. Maquettes](#20-maquettes)
- [21. Références](#21-références)

---

# 1. Présentation générale du projet

 ## 1.1 Quoi

La Pince est une application web de gestion de finances personnelles permettant aux utilisateurs de suivre leurs dépenses, gérer leurs budgets et visualiser leur situation financière de manière simple, rapide et intuitive.

## 1.2 Qui 

Le projet est développé pour une société fictive souhaitant proposer un outil clair et accessible, destiné à aider les particuliers à mieux gérer leur budget au quotidien.

## 1.3 Pour qui

La Pince s’adresse à un public large :
- jeunes adultes souhaitant suivre leurs dépenses,
- familles gérant un budget commun,
- étudiants surveillant leurs dépenses mensuelles,
- travailleurs indépendants séparant dépenses pro/perso,
- retraités consultant leurs dépenses régulières.

Leur besoin principal : **savoir rapidement combien il leur reste dans chaque budget**, sans utiliser des outils complexes comme Excel ou des applications bancaires avancées.

## 1.4 Comment 

Le projet est réalisé **en équipe**, en méthode **agile**, avec :
- des sprints successifs,
- un backlog priorisé,
- des revues et rétrospectives,
- une organisation claire des rôles.

L’architecture adoptée est une architecture web **client–serveur en trois couches** :
- **Front (Présentation)** : SPA React, interface utilisateur réactive  
- **API (Métier)** : Express + TypeScript, logique métier, sécurité, validation  
- **BDD (Persistance)** : PostgreSQL + Prisma, stockage des données sensibles  

Cette séparation permet une meilleure modularité, maintenabilité et sécurité

## 1.5 Quand
Le développement se déroule en plusieurs sprints incluant :
- conception (Sprint 0),
- développement (Sprints 1 à 3),
- tests,
- déploiement,
- recettage.

Chaque sprint doit livrer un produit **fonctionnel**, même minimal (MVP).

## 1.6 Pourquoi 

Le projet La Pince répond à plusieurs constats :
- les utilisateurs ont du mal à suivre leurs dépenses au quotidien,
- les outils existants sont souvent trop complexes ou payants,
- il manque une solution simple, intuitive et accessible,
- les utilisateurs veulent être alertés avant de dépasser leur budget.

L’objectif pédagogique est également central :  
- mettre en pratique les compétences acquises en développement full‑stack,
- gestion de projet agile,
- architecture logicielle,
- sécurité,
- documentation,
- travail en équipe.

## 1.7 Contexte détaillé
La gestion des dépenses personnelles est un besoin quotidien. Beaucoup d’utilisateurs cherchent un moyen simple, rapide et accessible pour :
- suivre leurs budgets,
- éviter les dépassements,
- comprendre où part leur argent. 
La Pince propose une interface claire, épurée, agréable à utiliser, pensée pour un usage quotidien, même rapide.

---

# 2. Besoins et objectifs

## 2.1 Problèmes auxquels répond le projet

Les utilisateurs ont souvent du mal à :
- suivre leurs dépenses (manque de visibilité sur les dépenses du quotidien),
- visualiser l’état de leurs budgets,
- identifier les dépassements à temps (difficulté à respecter un budget mensuel),
- organiser leurs dépenses par catégories (difficulté à se fixer et suivre des objectifs financiers).

Les applications existantes sont souvent :
- trop complexes (manque de vision globale (par catégorie, par période)),
- trop riches en fonctionnalités (absence d’outil simple pour catégoriser les dépenses),
- ou payantes.

## 2.2 Objectifs du projet
La Pince vise à permettre aux utilisateurs :
- de suivre leurs dépenses quotidiennes facilement.
- d'offrir une vue claire par catégorie et par période (visualisation de leurt situation financière).
- d'aider à respecter des budgets définis à l’avance (définir des budgets par catégories).
- d'alerter l’utilisateur en cas de dépassement ou de risque de dépassement (recevoir des alertes).
- de proposer une base solide pour des évolutions futures (dashboard, objectifs, etc.).

## 2.3 Résumé du fonctionnement 
L’utilisateur :
1. crée un compte,
2. se connecte à l’application,
3. accède à une liste de **catégories pré‑définies** (ex : “Courses”, “Loisirs”, “Transport”, “Santé”…),
4. peut définir une **limite de budget** pour chaque catégorie,
5. ajoute une dépense en sélectionnant :
   - une catégorie existante,
   - un montant,
   - une date,
   - un libellé,
6. consulte un tableau de bord affichant :
   - le montant total du budget,
   - le montant total par catégorie,
   - le montant total dépensé par catégorie,
   - le montant restant avant d’atteindre la limite,
   - une alerte lorsque la limite est proche, atteinte ou dépassée (80% de la limite & 100 %).

## 2.4 Exemple d’usage 
> “Je sélectionne la catégorie ‘Courses’, qui possède une limite de 200 €.  
> J’ajoute mes dépenses au fur et à mesure : 35 €, 12 €, 48 €…  
> Le tableau de bord m’indique que j’ai dépensé 95 € sur 200 €,  
> et qu’il me reste 105 € avant d’atteindre la limite.  
> Si j'atteins 80% des 200 €, une 1ère alerte apparaît.”

## 2.5 Valeur ajoutée 
- Interface simple et épurée  
- Prise en main immédiate  
- Vision claire de l’état des finances  
- Système d’alertes  
- Sécurité des données  
- Adapté à un usage quotidien

## 2.6 Vision du produit 
La Pince vise à devenir un outil :
- **simple** : pas de fonctionnalités superflues,
- **efficace** : l’essentiel en un coup d’œil,
- **évolutif** : ajout futur de graphiques, exports, objectifs,
- **accessible** : lisible, compatible mobile,
- **sécurisé** : accès uniquement après connexion.


---

# 3. Fonctionnalités du projet

## 3.1 MVP – Minimum Viable Product

Fonctionnalités indispensables pour que La Pince fonctionne.

### Authentification
  - Inscription
  - Connexion
  - Déconnexion 

### Gestion des dépenses
  - Ajout d’une dépense
  - Modification d’une dépense
  - Suppression d’une dépense
  - Liste des dépenses

### Catégorisation
  - Liste de catégories pré‑définies (ex : Courses, Loisirs, Transport, Santé…)
  - Sélection d’une catégorie lors de l’ajout d’une dépense
  - Affichage des dépenses par catégorie

Évolution possible :
  - Création de catégories
  - Association d’une dépense à une catégorie
  - Affichage des dépenses par catégorie

### Budgets simples
  - Définir une limite de budget pour chaque catégorie
  - Voir :

      - le montant total dépensé par catégorie
      - le montant restant avant d’atteindre la limite
      - les alertes (80 % et 100 %) : lorsque le budget d’une catégorie est dépassé ou proche du dépassement (même sous forme simple : message dans l’interface)

### Dashboard simple
Le tableau de bord permet à l’utilisateur d’obtenir une vision claire et immédiate de sa situation financière.  
Il regroupe les informations essentielles et donne accès aux actions principales.
Contenu du dashboard :

Totaux globaux :
  - Total dépensé toutes catégories confondues
  - Total restant avant d’atteindre les limites cumulées

Totaux par catégorie :
  - Montant dépensé
  - Limite définie
  - Montant restant
  - Barre de progression (visuelle)

Graphiques :
  - Camembert : répartition des dépenses par catégorie
  - Histogramme : évolution des dépenses par période (jour/semaine/mois)

Alertes visibles :
  - Alerte **80 %** (limite proche)
  - Alerte **100 %** (limite atteinte ou dépassée)
  - Indicateur visuel (couleur, icône)
 
Actions accessibles depuis le dashboard :

- **Ajouter une dépense**
  - Bouton d’accès rapide
  - Redirection vers le formulaire d’ajout

- **Gérer les limites de budget**
  - Accès direct à la page “Budgets”
  - Possibilité de modifier la limite d’une catégorie pré‑définie

- **Accéder aux catégories**
  - Consultation des catégories pré‑définies
  - **Bouton ON/OFF** pour activer ou désactiver les alertes par catégorie
  - Visualisation de leur limite et de leur état (OK / 80 % / 100 %)

Objectif du dashboard
- Donner une vue synthétique et lisible
- Permettre une prise de décision rapide
- Alerter l’utilisateur avant qu’il ne dépasse ses limites
- Faciliter l’ajout de dépenses et la gestion des budgets

## 3.2 Évolutions potentielles (hors MVP)

- **Tableau de bord avancé** : graphiques plus élaborés pour visualiser les dépenses par catégorie, par mois, etc.
- **Gestion de groupes d’utilisateurs** : budgets partagés (famille, colocation).
- **Planification de l’épargne** : objectifs d’épargne et suivi de progression.
- **Rapports personnalisés** : export ou affichage des dépenses par période, catégorie, type.
- **Système d’objectifs et de récompenses** : badges, gamification.
- **Budget collaboratif avancé** : rôles (admin, lecture seule, contributeur).
- **Notifications avancées** : alertes temps réel, emails, etc.
- **Intégration d’une API de conversion de devises**.
- **Catégorisation intelligente** : suggestion automatique de catégorie selon le libellé.
- **Import de relevés bancaires (CSV)**.
- **Support multilingue** : français / anglais.

---

# 4. Architecture fonctionnelle 

## 4.1 Parcours utilisateur — Inscription / Connexion /Deconnexion
1. Accueil → Register / Login
2. Connexion → Dashboard
3. Deconnexion -> Accueil

## 4.2 Parcours utilisateur — Ajouter une dépense
1. L’utilisateur clique sur “Dépenses” : Dépenses → Ajouter
2. Il clique sur “Ajouter une dépense”.
3. Il sélectionne une **catégorie pré‑définie**.
4. Il saisit le montant, la date, le libellé : Formulaire → Validation
5. La dépense apparaît dans la liste et dans le dashboard.

## 4.3 Parcours utilisateur — Définir une limite de budget
1. L’utilisateur ouvre “Budgets”.
2. Il sélectionne une catégorie pré‑définie.
3. Il définit une limite (ex : 200 €).
4. Il selectionne on / off pour l'alerte
5. Le dashboard affiche :
   - montant dépensé,
   - montant restant,
   - alertes 80 % / 100 %.

## 4.4 Parcours utilisateur — Dashboard
1. L’utilisateur ouvre “Dashboard”.
2. Il voit :
   - total dépensé par catégorie,
   - total restant,
   - alertes,
   - répartition simple.



# 5. Architecture du projet

## 5.1 Vue d’ensemble

**Frontend**
  - Application web (SPA) en React / TypeScript.
  - Gestion des routes côté client avec React Router
  - Appels API backend via services
  - Dashboard dynamique basé sur les catégories pré‑définies.

**Backend**
  - API REST (Node.js / Express) + TypeScript.
  - Routes sécurisées par JWT (authentification).
  - Validation des données (Zod).
  - Prisma pour la base de données

**Base de données**
  - PostgreSQL.
  - Tables :
    - utilisateurs
    - catégories (pré‑définies)
    - dépenses
    - budgets (limites par catégorie)
- Accès via ORM (Prisma).

## 5.2 Justification des choix

- **React** : écosystème mature, composants réutilisables, bonne intégration avec TypeScript.
- **Node.js / Express** : stack JavaScript unifiée, simplicité pour créer une API REST.
- **Prisma + PostgreSQL** : typage fort, migrations, requêtes lisibles.
- **JWT** : standard pour l’authentification stateless.
- **TypeScript** : sécurisation du code, meilleure maintenabilité.

**Résumé des justifications**
- Modularité
- Maintenabilité
- Sécurité
- Scalabilité

---

## 5. Technologies utilisées

**Frontend**
  - React
  - TypeScript
  - Vite (ou autre bundler)
  - CSS / framework CSS (CSS Modules)

**Backend**
  - Node.js
  - Express
  - Prisma
  - PostgreSQL
  - Zod (validation)
  - Jest (tests)

**Communication**
  - Front ↔ API : HTTPS + JWT
  - API ↔ BDD : ORM Prisma

**Outils**
  - Git / GitHub
  - Trello (gestion de projet)
  - Thunder Client / Postman (tests API)
  - Docker (environnement de dev / déploiement futur)

Justification : technologies modernes, largement utilisées en entreprise, adaptées à un projet pédagogique full‑stack.

---

# 7. Cible et contraintes

## 7.1 Cible

- Étudiants
- Jeunes actifs
- Familles
- Travailleurs indépendants
- Toute personne souhaitant suivre et optimiser son budget

## 7.2 Contraintes ergonomiques / visuelles

- Interface simple, lisible, peu chargée.
- Navigation claire (menu, sections bien identifiées).
- Mise en avant des informations clés : solde, budgets, alertes.

## 7.3 Navigateurs compatibles

- Chrome (version récente)
- Firefox (version récente)
- Edge (version récente)
- Safari (version récente)

Objectif : compatibilité avec les navigateurs modernes, desktop et mobile.

---

# 8. Arborescence de l’application (front)

Exemple d’arborescence fonctionnelle (routes) :

- `/` : page d’accueil / landing 
- `/register` : inscription
- `/login` : connexion
- `/dashboard` : vue globale (MVP ou évolution)
- `/expenses` : liste des dépenses
- `/expenses/new` : création d’une dépense
- `/expenses/:id/edit` : modification d’une dépense
- `/categories` : gestion des catégories
- `/budgets` : gestion des budgets 
- `/profile` : profil utilisateur 

---

```
 /
├── Accueil
├── Register
├── Login
├── Dashboard
│   ├── Vue globale
│   ├── Totaux mensuels
│   └── Alertes
├── Dépenses
│   ├── Liste
│   ├── Ajouter
│   └── Modifier
├── Catégories
│   ├── Liste
│   └── Ajouter / Modifier limite budget
├── Budgets
│   ├── Liste
│   └── Alertes on/off
└── Profil
```  

# 9. Routes API prévues (backend)

Exemple d’endpoints (à adapter à votre implémentation réelle) :

## 9.1 Authentification

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout` 
- `GET /auth/me` (profil utilisateur connecté)

## 9.2 Catégories

- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PATCH /categories/:id`
- `DELETE /categories/:id`

## 9.3 Dépenses

- `GET /expenses`
- `GET /expenses/:id`
- `POST /expenses`
- `PATCH /expenses/:id`
- `DELETE /expenses/:id`

## 9.4 Budgets (si MVP ou sprint suivant)

- `GET /budgets`
- `POST /budgets`
- `PATCH /budgets/:id`
- `DELETE /budgets/:id`

---

# 10. User stories

**US1 – Inscription**
En tant que **nouvel utilisateur**, je dois pouvoir **créer un compte** afin de **accéder à mon espace personnel**.

**US2 – Connexion**
En tant que **utilisateur**, je dois pouvoir **me connecter** afin de **accéder à mes données de dépenses**.

**US3 – Ajouter une dépense**
En tant que **utilisateur connecté**, je dois pouvoir **ajouter une dépense** afin de **suivre mes dépenses au quotidien**.

**US4 – Gérer mes catégories**
En tant que **utilisateur**, je dois pouvoir **créer et modifier des catégories** afin de **organiser mes dépenses**.

**US5 – Définir un budget par catégorie**
En tant que **utilisateur**, je dois pouvoir **définir un budget pour une catégorie** afin de **ne pas dépasser un montant fixé**.

**US6 – Être alerté en cas de dépassement**
En tant que **utilisateur**, je dois pouvoir **être averti lorsque je dépasse un budget** afin de **adapter mes dépenses**.

---

# 11. Analyse des risques


**Risque :** retard dans la mise en place de l’authentification  
**Mesure :** prioriser l’auth dès le Sprint 1, limiter les fonctionnalités annexes.

**Risque :** complexité du modèle de données (budgets, catégories, dépenses)  
**Mesure :** commencer simple (MVP), ajouter les cas complexes plus tard.

**Risque :** surcharge du frontend (trop de fonctionnalités d’un coup)  
**Mesure :** découper en sprints, se concentrer sur un flux simple au début.

**Risque :** manque de temps pour les tests  
**Mesure :** intégrer les tests dans la définition du “Done”, déléguer une partie à un membre dédié.

---

# 12. Rôles de l’équipe

## 12.1 Répartition des rôles – Sprint 0

### Cahier des charges
- Présentation générale du projet : Kaouther  
- Cible : Kaouther, Medhi  
- Problèmes / besoins : Medhi  
- Objectifs : Medhi  
- Fonctionnalités (MVP + évolutions) : Medhi  
- Contraintes : Medhi  
- Navigateurs compatibles : Kaouther  

### Conception fonctionnelle
- User Stories : Medhi, Kaouther  
- Analyse des risques : Medhi  
- Parcours utilisateur : Nicolas  
- Arborescence du site : Nicolas  
- Use Case : Medhi, Kaouther  
- Routes front : Nicolas  
- Routes API : Nicolas  
- Diagramme de séquence d’une fonctionnalité complexe : Nicolas  

### Conception technique
- MCD (Merise) : Khouloud, Nicolas  
- MLD : Khouloud, Nicolas  
- Dictionnaire de données : Khouloud  
- Architecture du projet (front / back / BDD) : Nicolas  

### Conception graphique
- Wireframes (Login, Register, Dashboard, Dépenses, Catégories, Budgets) : Khouloud, Nicolas, Medhi, Kaouther  
- Maquettes (Desktop + Mobile) : Khouloud, Nicolas, Medhi  
- Charte graphique complète (couleurs, typo, UI, composants) : Khouloud, Kaouther  

### Organisation / gestion de projet
- Backlog Sprint 0 : (à définir selon l’équipe, non précisé)  
- Répartition des rôles : Toute l’équipe  
- Préparation du Sprint 1 : Nicolas  
- Journal de l’équipe (logistique) : Kaouther  
- Mise en place du Trello : Kaouther  
- Présentation projet Sprint 0 : Kaouther, Medhi  

---

## 12.2 Répartition des rôles – Sprint 1

### Front End (React)

#### Pages
- feature/page-auth-login : Medhi  
- feature/page-auth-register : Khouloud  
- feature/page-auth-profil : Medhi (si la page existe)  

#### Services Auth
- feature/service-auth-login : Medhi  
- feature/service-auth-logout : Khouloud  
- feature/service-auth-register : Khouloud  

#### Intégration front
- Intégration Auth + UI : Khouloud, Medhi  
- Vérification cohérence front/back : Khouloud  
- Composants : (non présents explicitement dans Trello Sprint 1)  

---

### Back End (Node / Express / Prisma)

#### Routes Auth
- feature/route-auth-login : Kaouther  
- feature/route-auth-logout : Kaouther  
- feature/route-auth-register : Kaouther  

#### Middleware
- feature/middleware-auth : Kaouther  

#### Services / Controllers
- Services Auth : Kaouther  
- Controllers Auth : Kaouther  

#### Tests
- Tests Auth (login / register / logout) : Nicolas  
- Tests middleware : Nicolas  

#### Base de données
- Modèle User (Prisma) : Nicolas  
- Connexion BDD : Nicolas  
- Hash / vérification mot de passe : Nicolas  

---

## 12.3 Organisation / gestion de projet – Sprint 1

- Mise à jour du Trello Sprint 1 (ajout des fiches) : Kaouther  
- Mise à jour individuelle des tâches (cases cochées) : Toute l’équipe  
- Journal de l’équipe : Kaouther  
- Réunions quotidiennes : organisées par Kaouther, participation de toute l’équipe  
- Suivi des tâches : Toute l’équipe  
- Déploiement (Render) : Nicolas  
- Installation initiale du projet : Nicolas  

---

## 12.4 Rôles transverses (hors Trello)

### Kaouther — Logistique du projet
- Journal de l’équipe  
- Organisation des réunions  
- Insertion des cartes Trello  
- Suivi global du projet  

### Nicolas — Responsable technique
- Installation du projet  
- Déploiement  
- Tests des routes et authentification  
- Support technique général  

### Khouloud — Communication front/back
- Cohérence des fichiers  
- Cohérence des données  
- Cohérence API ↔ front  

### Medhi — Cohérence visuelle
- Respect des maquettes  
- Respect de la charte graphique  
- Respect des wireframes  
- Cohérence avec les documents du Sprint 0  

---

# 13. MCD – Modèle Conceptuel de Données

> Ici, soit coller MCD existant, soit le décrire textuellement.

Exemple de description (à adapter au travail réel) :

- **Entité Utilisateur**
  - id, email, mot_de_passe, nom, date_creation

- **Entité Catégorie**
  - id, nom, couleur, utilisateur_id

- **Entité Dépense**
  - id, libellé, montant, date, utilisateur_id, categorie_id

- **Entité Budget**
  - id, montant_max, periode, categorie_id, utilisateur_id

Relations (exemples) :

- Un **Utilisateur** possède plusieurs **Catégories**.
- Un **Utilisateur** possède plusieurs **Dépenses**.
- Une **Catégorie** possède plusieurs **Dépenses**.
- Une **Catégorie** peut avoir plusieurs **Budgets** (par période).

---

# 14. MLD – Modèle Logique de Données

Traduction du MCD en tables relationnelles (exemple à adapter) :

- **UTILISATEUR**(id PK, email, mot_de_passe, nom, date_creation)
- **CATEGORIE**(id PK, nom, couleur, utilisateur_id FK → UTILISATEUR.id)
- **DEPENSE**(id PK, libelle, montant, date, utilisateur_id FK → UTILISATEUR.id, categorie_id FK → CATEGORIE.id)
- **BUDGET**(id PK, montant_max, periode, categorie_id FK → CATEGORIE.id, utilisateur_id FK → UTILISATEUR.id)

---

# 15. Use Cases

Exemples de cas d’utilisation (à détailler selon vos docs) :

**UC1 : Gérer son compte**
  - Acteur : Utilisateur
  - Scénario : s’inscrire, se connecter, se déconnecter.

**UC2 : Gérer ses dépenses**
  - Acteur : Utilisateur
  - Scénario : ajouter, modifier, supprimer, consulter ses dépenses.

**UC3 : Gérer ses catégories**
  - Acteur : Utilisateur
  - Scénario : créer, renommer, supprimer des catégories.

**UC4 : Gérer ses budgets**
  - Acteur : Utilisateur
  - Scénario : définir un budget par catégorie, consulter l’état du budget.



---

# 16. Diagramme de séquence (description textuelle)

Exemple : **“Ajout d’une dépense”**

1. L’utilisateur est connecté et ouvre la page “Nouvelle dépense”.
2. Il remplit le formulaire (montant, libellé, catégorie, date).
3. Le frontend envoie une requête `POST /expenses` à l’API avec le token.
4. Le backend valide les données, enregistre la dépense en base.
5. Le backend renvoie une réponse de succès.
6. Le frontend affiche un message de confirmation et met à jour la liste.

---

# 17. Dictionnaire de données

Exemple (à compléter selon votre MCD/MLD réel) :

**Utilisateur**
  - `id` : identifiant unique (entier)
  - `email` : email de connexion (string)
  - `mot_de_passe` : hash du mot de passe (string)
  - `nom` : nom affiché (string)
  - `date_creation` : date de création du compte (date)

**Catégorie**
  - `id` : identifiant unique
  - `nom` : nom de la catégorie (string)
  - `couleur` : code couleur (string, optionnel)
  - `utilisateur_id` : FK vers Utilisateur

**Dépense**
  - `id` : identifiant unique
  - `libelle` : description de la dépense
  - `montant` : montant (nombre)
  - `date` : date de la dépense
  - `utilisateur_id` : FK vers Utilisateur
  - `categorie_id` : FK vers Catégorie

**Budget**
  - `id` : identifiant unique
  - `montant_max` : montant maximum autorisé
  - `periode` : période (mois, semaine, etc.)
  - `categorie_id` : FK vers Catégorie
  - `utilisateur_id` : FK vers Utilisateur

---

# 18. Wireframe

  - Page Login
  - Page Register
  - Page Liste des dépenses
  - Page Catégories
  - Page Budgets / Dashboard (si déjà esquissée)




# 19.CHARTE GRAPHIQUE 

## 19.1 Identité visuelle

L’application adopte une identité visuelle moderne, minimaliste et orientée finance.

Objectifs :
- Clarté
- Simplicité
- Fiabilité

Inspiration : Finary, Revolut, Boursorama.

La couleur identitaire est un orange vif (#F47918), utilisé en mode clair comme en mode sombre.

Le mode sombre repose sur un noir profond.

---

## 19.2 Palette de couleurs

### 19.2.1 Couleurs principales

| Rôle | Couleur | Code | Usage |
|------|---------|------|--------|
| Primaire | Orange | #F47918 | Boutons, éléments interactifs |
| Primaire Hover | Orange foncé | #C65F12 | États actifs |
| Primaire Soft | Orange clair | #FFB06A | Badges, hovers légers |

### 19.2.2 Couleurs fonctionnelles

| Rôle | Couleur | Code |
|------|---------|------|
| Succès | Vert | #4CAF50 |
| Avertissement | Orange | #F47918 |
| Erreur | Rouge | #E53935 |
| Info | Bleu doux | #4DA3FF |

### 19.2.3 Couleurs neutres

#### Mode Light

| Rôle | Couleur | Code |
|------|---------|------|
| Fond général | Blanc | #FFFFFF |
| Fond secondaire | Gris très clair | #F7F7F7 |
| Texte principal | Noir | #1A1A1A |
| Texte secondaire | Gris foncé | #4A4A4A |
| Bordures | Gris clair | #E5E5E5 |
| Muted | Gris moyen | #9E9E9E |

#### Mode Dark

| Rôle | Couleur | Code |
|------|---------|------|
| Fond général | Noir profond | #000000 |
| Fond secondaire | Anthracite | #0D0D0D |
| Fond tertiaire | Gris sombre | #1A1A1A |
| Texte principal | Blanc | #FFFFFF |
| Texte secondaire | Gris clair | #B3B3B3 |
| Bordures | Gris foncé | #2A2A2A |
| Muted | Gris moyen | #6E6E6E |

---

## 19.3 Typographies

### 19.3.1 Police principale : Inter

- Titres : SemiBold
- Sous-titres : Medium
- Paragraphes : Regular
- Chiffres : Tabular Lining

### 19.3.2 Police secondaire : Poppins

Utilisation :
- Titres marketing
- Landing pages
- Slogans

---

## 19.4 Iconographie

- Style linéaire, épuré, moderne
- Épaisseur : 2 px
- Coins légèrement arrondis
- Couleurs : noir ou orange en mode light, blanc ou orange en mode dark

Packs recommandés :
- Feather Icons
- Lucide Icons
- Remix Icons (line)

---

## 19.5 Style des boutons

### 19.5.1 Bouton principal (Primary)

Mode Light :
- Fond : #F47918
- Texte : #FFFFFF
- Hover : #C65F12
- Coins : 8 px
- Hauteur : 48 px

Mode Dark :
- Fond : #F47918
- Texte : #000000
- Hover : #FFB06A

### 19.5.2 Bouton secondaire (Outline)

Mode Light :
- Bordure : 2 px #F47918
- Fond : transparent
- Texte : #F47918
- Hover : #FFF4E8

Mode Dark :
- Bordure : 2 px #F47918
- Fond : transparent
- Texte : #F47918
- Hover : #1A1A1A

### 19.5.3 Bouton d’alerte

- Fond : #E53935
- Texte : blanc
- Coins : 8 px

---

## 19.6 Style des formulaires

### 19.6.1 Champs de saisie

Mode Light :
- Fond : #FFFFFF
- Bordure : #E5E5E5
- Coins : 6 px
- Hauteur : 44 px
- Focus : #F47918
- Placeholder : #9E9E9E

Mode Dark :
- Fond : #0D0D0D
- Bordure : #2A2A2A
- Focus : #F47918
- Placeholder : #6E6E6E

### 19.6.2 Labels

- Taille : 14 px
- Couleur : #1A1A1A (light) / #FFFFFF (dark)
- Style : Medium

### 6.3 Messages d’erreur

- Couleur : #E53935
- Taille : 13 px

---

## 19.7 Style des cartes et sections

### 19.7.1 Cartes

Mode Light :
- Fond : #FFFFFF
- Coins : 10 px
- Ombre : 0 2px 6px rgba(0,0,0,0.06)
- Padding : 20 px

Mode Dark :
- Fond : #0D0D0D
- Bordure : #1A1A1A
- Coins : 10 px
- Padding : 20 px

### 19.7.2 Sections

- Fond : #F7F7F7 (light) / #000000 (dark)
- Titres : Poppins SemiBold
- Espacement vertical : 60 px

---

## 19.8 Logo et déclinaisons

- Style minimaliste
- Forme : symbole financier (pince, portefeuille, graphique)
- Couleur principale : #F47918
- Versions :
  - Light : orange + noir
  - Dark : orange + blanc
  - Monochrome : blanc ou noir

---

## 19.9 Variables CSS

```css
:root {
  --lp-primary: #F47918;
  --lp-primary-soft: #FFB06A;
  --lp-primary-hover: #C65F12;

  --lp-bg: #FFFFFF;
  --lp-bg-subtle: #F7F7F7;
  --lp-text: #1A1A1A;
  --lp-text-muted: #4A4A4A;
  --lp-border: #E5E5E5;

  --lp-font: "Inter", system-ui, sans-serif;
}

[data-theme="dark"] {
  --lp-bg: #000000;
  --lp-bg-subtle: #0D0D0D;
  --lp-text: #FFFFFF;
  --lp-text-muted: #B3B3B3;
  --lp-border: #2A2A2A;
}

---
```
## 19.10 Figma Tokens (JSON)

```json
{
  "color": {
    "primary": { "value": "#F47918" },
    "primary-soft": { "value": "#FFB06A" },
    "primary-hover": { "value": "#C65F12" },

    "light-bg": { "value": "#FFFFFF" },
    "light-bg-subtle": { "value": "#F7F7F7" },
    "light-text": { "value": "#1A1A1A" },

    "dark-bg": { "value": "#000000" },
    "dark-bg-subtle": { "value": "#0D0D0D" },
    "dark-text": { "value": "#FFFFFF" }
  },
  "font": {
    "family": { "value": "Inter" },
    "size-body": { "value": 16 },
    "size-caption": { "value": 13 }
  },
  "radius": {
    "sm": { "value": 6 },
    "md": { "value": 10 },
    "lg": { "value": 16 }
  }
}
```
# 20. Maquettes
  - Version desktop

  - Version mobile (mobile first)
# 21. Références
> Ici, tu peux référencer vos fichiers existants (Drive / Figma / autre).

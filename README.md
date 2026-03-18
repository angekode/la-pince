# Lancement des services (dev)

Cette partie montre comment lancer séparement chaque service à la main sans Docker.

## Client

Pour lancer le front pendant le développement :

- Copier le fichier `client/.env.example` vers un nouveau fichier `client/.env`.
  - Vérifier que l'adresse du serveur API `VITE_API_BASE_URL` corresponde bien au niveau du port avec celui utilisé par l'API dans le fichier `api/.env` avec la variable `PORT`.

- Lancer le serveur front avec : 
```
cd client # si on est à la racine du dépot
npm install
npm run dev
```

- Penser à bien lancer le service API et la base de données.


## API

Pour lancer le serveur API durant le développement :

- Copier le fichier `api/.env.example` vers `api/.env` (bien faire attention à la variable PORT 
  qui doit correspondre au port contenu dans VITE_API_BASE_URL du client).

- Lancer le serveur API avec les commandes suivantes :
```
cd api # si on est à la racine du dépot
npm install
npm run dev
```

- Penser à bien lancer la base de données.


## Base de donnée

Pour lancer la base de données il faut une base de donnée dans PostgreSQL.

- Se connecter au client psql avec l'utilsateur `posgres` : 
```
psql -U postgres
```
- Puis saisir ces commandes dans le client psql :
```
CREATE USER lapince PASSWORD 'lapince';
CREATE DATABASE lapince OWNER lapince;
ALTER ROLE lapince CREATEDB;
```

La dernière commande est utile pour prisma qui a besoin des droits pour créer une base de donnée test. Sans cela une erreur `Error: P3014` peut appraitre avec la commande `npx prisma migrate dev`.

- Ensuite pour créer les tables dans la base de données :
```
cd api
npm run db:migrate:dev
```

# Lancement des services en production (Docker)

Pour lancer tous les services en même temps (database, api, client) en mode production, il faut se placer à la racine du projet et saisir la commande :
```
npm run docker:prod
```

Pour arrêter tous les services : 

```
npm run docker:prod:down
```

# Lancement des services en dev (Docker)

Pour lancer tous les services en même temps (database, api, client) en mode production, il faut se placer à la racine du projet et saisir la commande :
```
npm run docker:dev
```

Pour arrêter tous les services : 

```
npm run docker:dev:down
```

# Instructions code


Pour chaque création de nouvelle fonctionnalité le code doit être écrit dans une nouvelle branche
au format suivant : `feature/nom-de-la-fonctionnalité`. 

- Avant de créer une nouvelle branche il faut s'assurer d'être dans la branche master :
```
git switch master
```

- Ensuiter créer une nouvelle branche :
```
git checkout -b feature/nom-de-la-fonctionnalité
```

- Penser à créer des commits réguliers au format: `feat: création d'un composant pour l'accueil` : 
```
git add .
git commit -m "feat: création d'un composant pour l'accueil"
```

- Une fois la fonctionnalité est terminée et fonctionnelle, pousser le code sur le repot distant :
```
git push -u origin feature/nom-de-la-fonctionnalité
```

- Faire une pull request sur le dépot [github](https://github.com/O-clock-Francfort/la-pince) :

  - Cliquer sur "Compare & pull request"
  
  ![alt text](docs/images/compare-pull-request.png)
  
  - Cliquer sur "Create Pull Request"
  
  ![alt text](docs/images/pull-request-create.png)



# Déploiement

Pour l'instant seul le service client peut être déployé.

```
# il faut se placer à la racine
cd client

# pour pouvoir lancer la transpilation ensuite
npm install 

# pour créer le dossier dist qui contient les fichiers transpilés du front
npm run build 

# retour à la racine
cd .. 

# lancement du service client
docker compose -f .\deploy\docker-compose.yml up
```

# Documentation API

La documentation est accessible via l'API sur : http://localhost:3000/docs. 

Elle aussi disponible au format json ici : `./api/docs/api-doc.json`.
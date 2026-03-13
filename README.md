# Déploiement et installation

Cette partie répertorie l'ensemble des actions à effectuer pour lancer les environnements de 
développement, de test ou de déploiement.


## Client

Commande pour lancer l'interface front durant le développement :
```
cd client # si on est à la racine du dépot
npm install
npm run dev
```


## API

Pour lancer le serveur API durant le développement :

- Copier le fichier `api/.env.example` vers `api/.env`.
- Saisir les commandes suivantes :
```
cd api # si on est à la racine du dépot
npm install
npm run dev
```

## Base de donnée

*A remplir*



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
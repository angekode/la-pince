# app.ts — Documentation interne

## 🎯 Rôle du fichier
`app.ts` contient **toute la configuration de l'application Express** :

- middlewares globaux (CORS, JSON, cookies)
- documentation Swagger
- déclaration des routes
- configuration de l'application (mais pas le démarrage du serveur)

Ce fichier ne lance **pas** le serveur.  
Il est importé dans `index.ts`, ce qui permet :

- de tester l'application sans lancer le serveur
- de séparer la configuration de l'exécution
- d'améliorer la maintenabilité

---

## 🧩 Contenu principal

### 1. Middlewares
- `cors()` : autorise le frontend à accéder à l’API
- `express.json()` : permet de lire le JSON
- `cookieParser()` : permet de lire les cookies HTTPOnly

### 2. Swagger
La documentation API est disponible sur `/docs`.

### 3. Routes
- `/auth` → routes d’authentification
- `/categories` → routes des catégories
- `/` → route de test

---

## 📝 Notes
- `app.ts` ne doit jamais contenir `app.listen()`
- Il doit rester simple et centré sur la configuration

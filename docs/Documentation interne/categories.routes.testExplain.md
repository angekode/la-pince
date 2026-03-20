# categories.routes.test.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient des tests d’intégration pour vérifier le bon fonctionnement des routes :

- `GET /categories`
- `GET /categories/:id`

Ces tests utilisent la vraie API, la vraie base de données et un utilisateur réellement créé via `/auth/register`.

---

## 🧩 Structure des tests

### 1. GET /categories
- crée un utilisateur
- insère des catégories en base
- appelle la route
- vérifie :
  - le statut HTTP
  - le nombre de catégories
  - la cohérence des données

### 2. GET /categories/:id
- vérifie qu’une catégorie existante est renvoyée
- vérifie qu’une catégorie inexistante renvoie 404

---

## 🧩 Fonctions utilitaires

### postObject()
Envoie une requête POST JSON.

### extractTokenFromCookie()
Récupère le token JWT dans l’en-tête `Set-Cookie`.

### createNewUser()
- génère un utilisateur aléatoire
- l’enregistre via `/auth/register`
- le connecte via `/auth/login`
- renvoie `{ user, token }`

### seedCategories()
Insère plusieurs catégories pour un utilisateur donné.

---

## 📝 Notes importantes
- Les tests nécessitent une base **vide**.
- Ces tests sont des **tests d’intégration**, pas des tests unitaires.
- Ils vérifient la cohérence entre :
  - routes
  - contrôleurs
  - services
  - middleware d’auth
  - base de données

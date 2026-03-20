# auth.routes.test.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient des tests automatisés pour vérifier le bon fonctionnement des routes d’authentification :

- `/auth/register`
- `/auth/login`
- `/auth/logout`
- `/auth/me`

---

## 🧩 Structure des tests

### 1. Test du serveur
Vérifie que le serveur répond sur `/`.

### 2. Tests de /auth/register
- création valide → 201
- données invalides → 400

### 3. Tests de /auth/login
- utilisateur existant → token généré
- utilisateur inconnu → 404
- mauvais mot de passe → 401

### 4. Test de /auth/logout
- nécessite un token
- renvoie 200

### 5. Test de /auth/me
- nécessite un token
- renvoie les infos utilisateur

---

## 🧩 Fonctions utilitaires

### postObject()
Envoie une requête POST JSON.

### extractTokenFromCookie()
Récupère le token JWT dans l’en-tête `Set-Cookie`.

---

## 📝 Notes importantes
- Tous les tests sont désactivés via `{ skip: true }`.
- La base doit être **vide** avant d’exécuter les tests.
- Ces tests utilisent l’API réelle (tests d’intégration).

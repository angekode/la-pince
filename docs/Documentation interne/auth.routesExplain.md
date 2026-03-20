# auth.routes.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier regroupe toutes les routes liées à l’authentification :

- inscription
- connexion
- déconnexion
- récupération du profil utilisateur

Il utilise :
- les contrôleurs d’authentification
- le middleware `authMiddleware` pour protéger certaines routes
- les annotations Swagger pour générer la documentation API

---

## 🧩 Routes principales

### POST /auth/register
Crée un nouvel utilisateur.

### POST /auth/login
Connecte un utilisateur et génère un cookie HTTPOnly contenant un JWT.

### POST /auth/logout
Nécessite un token.  
Supprime le cookie JWT.

### GET /auth/me
Nécessite un token.  
Renvoie les informations de l’utilisateur connecté.

---

## 📝 Notes importantes
- Les routes sensibles utilisent `authMiddleware`.
- Swagger documente automatiquement les routes grâce aux commentaires JSDoc.
- Le router est exporté pour être monté dans `app.ts`.

# auth.controller.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient tous les contrôleurs liés à l’authentification :

- inscription (`register`)
- connexion (`login`)
- déconnexion (`logout`)
- récupération du profil utilisateur (`me`)

Il s’appuie sur :
- Prisma pour interagir avec la base
- bcrypt pour hasher les mots de passe
- JWT pour gérer l’authentification via cookie HTTPOnly

---

## 🧩 Fonctions principales

### 1. register()
- Vérifie que l’email et le mot de passe sont fournis
- Vérifie que l’email n’est pas déjà utilisé
- Hash le mot de passe avec bcrypt
- Crée l’utilisateur en base
- Retourne l’utilisateur sans le mot de passe

### 2. login()
- Vérifie que l’utilisateur existe
- Compare le mot de passe avec bcrypt
- Génère un JWT
- Stocke le token dans un cookie HTTPOnly
- Retourne les informations utilisateur

### 3. logout()
- Supprime le cookie `token`
- Retourne un message de confirmation

### 4. me()
- Récupère l’utilisateur via `req.user.id` (injecté par le middleware d’auth)
- Retourne les informations utilisateur

---

## 📝 Notes importantes
- Les mots de passe ne sont jamais stockés en clair.
- Le cookie HTTPOnly protège contre les attaques XSS.
- Le middleware d’auth ajoute `req.user`.
- Prisma est utilisé pour toutes les opérations DB.

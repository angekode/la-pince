# auth.routes.test.http — Documentation interne

## 🎯 Rôle du fichier
Ce fichier permet de tester manuellement les routes d’authentification via un client HTTP intégré (VS Code REST Client, Thunder Client, etc.).

---

## 🧩 Scénarios testés

### 1. Création d’un compte
Envoie une requête POST à `/auth/register`.

### 2. Connexion
Envoie une requête POST à `/auth/login`.

### 3. Récupération des infos utilisateur
Envoie une requête GET à `/auth/me` avec un cookie `token`.

---

## 📝 Notes importantes
- Le cookie JWT doit être collé manuellement dans la requête `/auth/me`.
- Ce fichier est utile pour tester rapidement l’API sans écrire de tests automatisés.

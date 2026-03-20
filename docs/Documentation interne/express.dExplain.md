# express.d.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier étend le type `Request` d’Express pour ajouter la propriété `req.user`.  
Cette propriété est ajoutée par le middleware d’authentification et doit être connue de TypeScript.

---

## 🧩 Pourquoi ce fichier existe ?
- Sans lui, TypeScript renverrait une erreur : `Property 'user' does not exist on type 'Request'`.
- Il centralise l’extension des types Express.
- Il évite de répéter le type dans chaque contrôleur.

---

## 📝 Notes importantes
- `declare global` permet d’ajouter des types à Express.
- `export {}` est nécessaire pour que TypeScript traite le fichier comme un module.
- `user` est optionnel car elle n’existe pas avant authentification.

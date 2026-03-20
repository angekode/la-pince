# auth.middleware.ts — Documentation interne

## 🎯 Rôle du fichier
Ce middleware protège les routes nécessitant une authentification.  
Il vérifie la présence d’un cookie `token`, le décode, et attache les informations utilisateur à `req.user`.

---

## 🧩 Fonctionnement

1. Le middleware lit `req.cookies.token` (grâce à cookie-parser).
2. Si le token est absent → erreur 401.
3. Le token est vérifié via `verifyToken()`.
4. Si valide → les données du token sont ajoutées à `req.user`.
5. Le middleware appelle `next()` pour continuer la chaîne.

---

## 📝 Notes importantes
- `AuthRequest` étend `Request` pour ajouter `req.user`.
- Le token est un cookie HTTPOnly, donc inaccessible en JavaScript côté client.
- Toute route protégée doit utiliser ce middleware.

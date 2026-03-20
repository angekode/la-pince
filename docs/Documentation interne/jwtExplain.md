# jwt.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier gère la création et la vérification des tokens JWT utilisés pour l’authentification.

---

## 🧩 Fonctions principales

### signToken(payload)
- Génère un token JWT signé avec la clé secrète.
- Le token expire au bout de 7 jours.

### verifyToken(token)
- Vérifie que le token est valide.
- Retourne le contenu du token (payload).

---

## 📝 Notes importantes
- La clé secrète doit être définie dans `.env`.
- Le token est stocké dans un cookie HTTPOnly côté client.
- Le middleware d’auth utilise `verifyToken`.

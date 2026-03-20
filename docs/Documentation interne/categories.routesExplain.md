# categories.routes.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier regroupe toutes les routes liées aux catégories de dépenses.  
Il utilise :

- les contrôleurs de catégories
- le middleware d’authentification
- les annotations Swagger pour la documentation

Toutes les routes sont protégées : un utilisateur doit être connecté pour y accéder.

---

## 🧩 Routes principales

### GET /categories
Renvoie toutes les catégories appartenant à l’utilisateur connecté.

### GET /categories/{id}
Renvoie une catégorie spécifique appartenant à l’utilisateur.

### POST /categories
Crée une nouvelle catégorie.

### PATCH /categories/{id}
Met à jour une catégorie existante.

### DELETE /categories/{id}
Supprime une catégorie appartenant à l’utilisateur.

---

## 📝 Notes importantes
- `router.use(authMiddleware)` protège toutes les routes du fichier.
- Les contrôleurs gèrent la logique HTTP.
- Les services gèrent la logique métier.
- Swagger génère automatiquement la documentation API.

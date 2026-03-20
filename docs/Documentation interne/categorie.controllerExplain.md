# categories.controller.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient les contrôleurs liés aux catégories de dépenses :

- récupération de toutes les catégories
- récupération d’une catégorie par ID
- création d’une catégorie
- mise à jour d’une catégorie
- suppression d’une catégorie

Il s’appuie sur :
- le service `categories.service.ts`
- les schémas Zod pour valider les données
- le middleware d’auth pour récupérer `req.user.id`

---

## 🧩 Fonctions principales

### 1. getAllCategories()
- Récupère toutes les catégories appartenant à l’utilisateur connecté
- Retourne `{ count, categories }`

### 2. getCategoryById()
- Vérifie que la catégorie appartient à l’utilisateur
- Retourne la catégorie ou une erreur 404

### 3. createCategory()
- Valide les données avec Zod
- Crée une nouvelle catégorie liée à l’utilisateur
- Retourne la catégorie créée

### 4. updateCategory()
- Valide les données
- Vérifie que la catégorie appartient à l’utilisateur
- Met à jour la catégorie
- Retourne un message de confirmation

### 5. deleteCategory()
- Vérifie que la catégorie appartient à l’utilisateur
- Supprime la catégorie
- Retourne un message de confirmation

---

## 📝 Notes importantes
- Toutes les opérations sont **scopées par utilisateur** (sécurité).
- Zod garantit que les données reçues sont valides.
- Le service gère la logique métier, le contrôleur gère la logique HTTP.


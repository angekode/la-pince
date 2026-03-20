# categories.service.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient toute la logique métier liée aux catégories.  
Il interagit directement avec Prisma et ne gère **aucune logique HTTP**.

---

## 🧩 Fonctions principales

### findAll(userId)
Retourne toutes les catégories appartenant à un utilisateur.

### findById(id, userId)
Retourne une catégorie **uniquement si elle appartient à l’utilisateur**.

### create(userId, data)
Crée une nouvelle catégorie liée à l’utilisateur.

### update(id, userId, data)
Met à jour une catégorie si elle appartient à l’utilisateur.

### remove(id, userId)
Supprime une catégorie si elle appartient à l’utilisateur.

---

## 📝 Notes importantes
- Toutes les opérations sont sécurisées par `userId`.
- `stripUndefined()` permet de gérer proprement les mises à jour partielles.
- Le service ne renvoie jamais d’erreur HTTP : il renvoie des données brutes.

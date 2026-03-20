# transactions.service.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient la logique métier liée aux transactions (dépenses).  
Il interagit directement avec Prisma et ne gère aucune logique HTTP.

---

## 🧩 Fonctions principales

### findAll(userId)
Retourne toutes les transactions de l’utilisateur, triées par date décroissante.

### findById(id, userId)
Retourne une transaction si elle appartient à l’utilisateur.

### create(userId, data)
Crée une nouvelle transaction.

### update(id, userId, data)
Met à jour une transaction existante.

### remove(id, userId)
Supprime une transaction appartenant à l’utilisateur.

---

## 📝 Notes importantes
- Toutes les opérations sont sécurisées par `userId`.
- `include: { category: true }` permet d’éviter un second appel DB.
- `stripUndefined()` évite d’écraser des champs non fournis lors d’un PATCH.

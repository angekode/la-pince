# transactions.controller.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier gère toute la logique HTTP liée aux transactions (dépenses).  
Il ne contient **aucune logique métier** :  
il se contente de :

- lire les données envoyées par le client
- valider les données avec Zod
- appeler les services (qui interagissent avec la base)
- renvoyer une réponse HTTP propre

---

## 🧩 Fonctions principales

### 1. getAllTransactions()
- Récupère toutes les transactions de l’utilisateur connecté
- Retourne `{ count, transactions }`

### 2. getTransactionById()
- Vérifie que la transaction appartient à l’utilisateur
- Retourne la transaction ou une erreur 404

### 3. createTransaction()
- Valide les données avec Zod
- Crée une transaction liée à l’utilisateur
- Retourne la transaction créée

### 4. updateTransaction()
- Valide les données partiellement (PATCH)
- Nettoie les champs `undefined` pour éviter d’écraser des valeurs
- Met à jour la transaction
- Retourne un message de confirmation

### 5. deleteTransaction()
- Vérifie que la transaction appartient à l’utilisateur
- Supprime la transaction
- Retourne un message de confirmation

---

## 📝 Notes importantes
- Toutes les opérations sont **scopées par utilisateur** (sécurité).
- Le contrôleur ne parle jamais directement à Prisma : il passe par les services.
- Zod garantit que les données reçues sont valides.
- `stripUndefined()` permet de gérer proprement les mises à jour partielles.

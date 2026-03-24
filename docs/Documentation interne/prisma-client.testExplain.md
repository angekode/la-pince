# prisma-client.test.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient des tests unitaires très simples permettant de vérifier :

- que Prisma peut se connecter à la base de données
- que la table `user` fonctionne correctement (création + lecture)

---

## 🧩 Structure des tests

### 1. Test de connexion
Vérifie que `prisma.$connect()` fonctionne sans erreur.

### 2. Test de création d’utilisateur
- crée un utilisateur fictif
- le relit immédiatement
- compare les valeurs stockées

---

## 📝 Notes importantes
- La variable `skip = true` désactive les tests tant que la base n’est pas prête.
- Ces tests doivent être exécutés sur une base **vide**.
- Ils servent de tests techniques, pas de tests métier.

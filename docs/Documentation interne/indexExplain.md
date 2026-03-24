# index.ts — Documentation interne

## 🎯 Rôle du fichier
`index.ts` est le **point d'entrée du serveur**.  
Il ne configure pas Express : il se contente de **lancer** l'application.

---

## 🧩 Responsabilités principales

### 1. Charger les variables d'environnement
`dotenv/config` permet d'utiliser `.env`.

### 2. Tester la connexion à la base
Avant de lancer le serveur, Prisma teste la connexion PostgreSQL.

### 3. Lancer le serveur Express
`app.listen()` démarre l'API sur le port défini dans `.env`.

---

## 📝 Pourquoi séparer `app.ts` et `index.ts` ?

- permet de tester Express sans lancer le serveur
- architecture plus propre
- meilleure maintenabilité
- conforme aux bonnes pratiques Node.js

---

## 🔧 Contenu du fichier
- import de `app.ts`
- import de Prisma
- fonction `start()` qui :
  - teste la DB
  - démarre le serveur

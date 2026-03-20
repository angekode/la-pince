# Dockerfile.prod — Documentation interne

## 🎯 Objectif du fichier
Ce Dockerfile construit l’image Docker de production pour l’API *La Pince*.  
Il utilise une architecture **multi-stage build**, ce qui permet :

- d’installer les dépendances
- de générer le client Prisma
- de transpiler le TypeScript
- puis de créer une image finale plus légère contenant uniquement le code nécessaire à l’exécution

---

## 🧱 Étape 1 — Build (construction du projet)

Cette étape utilise `node:25-alpine` pour :

- installer les dépendances (`npm install`)
- générer le client Prisma (`npm run db:generate`)
- transpiler le projet TypeScript → JavaScript (`npm run build`)

Le résultat est placé dans `/dist`.

---

## 🚀 Étape 2 — Runtime (exécution)

Cette étape crée une image finale plus légère :

- elle copie uniquement le résultat du build depuis l’étape précédente
- elle exécute `npm run prodstart`, qui lance Prisma puis Express en mode production

---

## 🧩 Pourquoi un multi-stage build ?

- L’image finale est **plus petite**
- Les dépendances de développement (TypeScript, Prisma CLI…) ne sont **pas incluses**
- Le build est **plus rapide** grâce au cache Docker
- C’est la méthode recommandée pour les API Node.js en production

---

## 📝 Notes importantes

- L’étape de build utilise `npm install` car elle a besoin des devDependencies.
- L’étape finale n’a pas besoin de `npm install --only=production` car elle copie déjà le résultat du build.
- Le script `npm run prodstart` doit lancer Prisma puis Express.

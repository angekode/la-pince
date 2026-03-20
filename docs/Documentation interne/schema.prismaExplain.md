# schema.prisma — Documentation interne

## 🎯 Rôle du fichier
`schema.prisma` est le fichier central de Prisma.  
Il définit :

- la structure de la base de données
- les relations entre les tables
- les types de données
- les noms des tables
- la configuration du client Prisma

C’est à partir de ce fichier que Prisma génère automatiquement :

- le client TypeScript (`prisma.user.findMany()`)
- les migrations SQL
- les types utilisés dans l’application

---

## 🧩 Structure du fichier

### 1. Generator
```prisma
generator client {
  provider = "prisma-client-js"
}
```
Indique à Prisma de générer un client JavaScript/TypeScript.

### 2. Datasource
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Configure la connexion à PostgreSQL.

## 🧱 Modèles (tables)

Cette section décrit les trois modèles principaux définis dans `schema.prisma`.  
Elle permet à toute l’équipe de comprendre la structure de la base de données, les relations et les champs importants.

---

### 🟩 User

Représente un utilisateur de l’application.

#### Champs importants
- **firstname** : prénom de l’utilisateur  
- **lastname** : nom de famille  
- **email** : adresse email unique  
- **password** : mot de passe hashé  
- **createdAt / updatedAt** : dates automatiques

#### Relations
- **expenses** : liste des dépenses associées à l’utilisateur  
- **categories** : catégories personnalisées créées par l’utilisateur  

---

### 🟩 Category

Représente une catégorie de dépense (ex : “Courses”, “Transport”, “Loisirs”).

#### Champs importants
- **name** : nom de la catégorie  
- **userId** : identifiant de l’utilisateur propriétaire  

#### Relations
- **user** : appartient à un utilisateur  
- **expenses** : contient plusieurs dépenses  

---

### 🟩 Expense

Représente une transaction/dépense effectuée par un utilisateur.

#### Champs importants
- **label** : nom de la dépense  
- **amount** : montant  
- **date** : date de la dépense  
- **description** : texte optionnel  
- **userId** : utilisateur associé  
- **categoryId** : catégorie associée  

#### Relations
- **user** : appartient à un utilisateur  
- **category** : appartient à une catégorie  

---

### 📝 Notes importantes

- Les relations Prisma sont **bidirectionnelles**, ce qui signifie que chaque relation est définie dans les deux modèles concernés.
- Les décorateurs `@@map()` permettent de **renommer les tables** dans la base de données tout en gardant des noms de modèles plus lisibles dans le code.
- Les champs `createdAt` et `updatedAt` sont automatiquement gérés grâce à :
  - `@default(now())`
  - `@updatedAt`
- Toute modification du schéma nécessite :
  ```bash
  npx prisma migrate dev
  npx prisma generate
  ```


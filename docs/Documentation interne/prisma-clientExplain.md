# prisma-client.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier initialise et exporte une instance unique de `PrismaClient`, qui permet à toute l’application d’interagir avec la base de données PostgreSQL.

Il centralise la configuration de Prisma, ce qui garantit :

- une seule connexion partagée dans toute l’API
- une configuration cohérente
- une gestion propre des connexions

---

## 🧩 Contenu du fichier

### 1. Import de PrismaClient
`PrismaClient` est généré automatiquement à partir du fichier `schema.prisma`.  
Il expose des méthodes comme `prisma.user.findMany()` ou `prisma.expense.create()`.

### 2. Adapter PostgreSQL
Prisma utilise ici l’adapter `PrismaPg`, qui permet d’utiliser le driver PostgreSQL natif.

### 3. Connexion via DATABASE_URL
La connexion est configurée via la variable d’environnement `DATABASE_URL`.

### 4. Export du client
Le fichier exporte une instance unique :

```ts
export const prisma = new PrismaClient({ adapter });
```
Cette instance est utilisée dans :
    - les controllers
    - les services
    - les tests
    - les scripts Prisma

📝 Notes
    - Il ne faut jamais créer plusieurs instances de PrismaClient dans un projet Node.
    - Prisma utilise un pool de connexions, donc une seule instance suffit.
    - Le fichier doit être importé partout où l’on a besoin d’accéder à la base.

    
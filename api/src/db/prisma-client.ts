// Importation de PrismaClient depuis @prisma/client (pack généré par Prisma)
// Ce client permet d'interagir avec la base de données via le schéma Prisma.
import { PrismaClient } from "@prisma/client";

// Importation de l'adapter PostgreSQL fourni par Prisma pour se connecter à une base PostgreSQL
// Cet adapter permet à Prisma d'utiliser le driver natif PostgreSQL.
import { PrismaPg } from "@prisma/adapter-pg";

// Créer une instance de l'adapter PostgreSQL en utilisant la variable d'environnement DATABASE_URL définie dans .env.
// Le "!" indique à TypeScript que la variable est forcément définie.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Créer le client Prisma en utilisant l'adapter PostgreSQL. 
// Ce client sera utilisé pour effectuer des opérations sur la base de données.
// Cela permet à Prisma d'utiliser PostgreSQL comme moteur de base de données.
export const prisma = new PrismaClient({
  adapter,
});


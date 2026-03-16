import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "dotenv/config";

// Sert à remplir la base de donnée avec des valeurs pour réaliser des tests
// A lancer avec la commande npx tsx "prisma/seed.ts" ou npm run "db:seed"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

await prisma.user.createMany({
  data: [
      { username: 'alice', email: 'alice@example.com', password: 'password' },
      { username: 'bob', email: 'bob@example.com', password: 'password' },
  ]
});
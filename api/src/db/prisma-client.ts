// Je me dis : "j'importe PrismaClient depuis @prisma/client"
import { PrismaClient } from "@prisma/client";

// J'importe l'adapter PostgreSQL
import { PrismaPg } from "@prisma/adapter-pg";

// Je me dis : "je crée un adapter PostgreSQL avec ma DATABASE_URL"
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Je me dis : "je crée mon client Prisma en utilisant l'adapter"
export const prisma = new PrismaClient({
  adapter,
});

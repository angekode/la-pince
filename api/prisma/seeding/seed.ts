import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "dotenv/config";
import categoriesData from "./data/categories.json" with { type: 'json' };
import expensesData from "./data/expenses.json" with { type: 'json' };
import usersData from "./data/users.json" with { type: 'json' };

// Sert à remplir la base de donnée avec des valeurs pour réaliser des tests
// A lancer avec la commande npx tsx "prisma/seed/seed.ts" ou npm run "db:seed"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });


const users = await prisma.user.createManyAndReturn({
  data: usersData
});

const categories = await prisma.category.createManyAndReturn({
  data: categoriesData.map(category => ({ name: category.name, userId: users[0].id }))
});

const expenses = await prisma.expense.createManyAndReturn({
  data: expensesData.map(expense => {
    const { category, ...rest } = expense;
    return {
      ...rest,
      categoryId: categories.find(c => c.name === expense.category)?.id ?? 0 
    };
  })
});

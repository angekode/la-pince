import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "dotenv/config";
import categoriesData from "./data/categories.json" with { type: 'json' };
import expensesData from "./data/expenses.json" with { type: 'json' };
import usersData from "./data/users.json" with { type: 'json' };
import bcrypt from "bcrypt";


/**
 * Sert à remplir la base de donnée avec des valeurs pour réaliser des tests
 * A lancer avec la commande npx tsx "prisma/seed/seed.ts" ou npm run "db:seed"
 * On utilise les données brutes des fichiers au format json du dossier "data", 
 * pour insérer les données dans la base de données avec createManyAndReturn. 
 * 
 * Attention l'ordre est important:
 * - On crée les utilisateurs pour récupérer leurs id.
 * - On crée les catégories en ajoutant l'id d'un utilisateur.
 * - On crée les dépenses en ajoutant l'id d'un utilisateur et celui de la catégorie.
*/




const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });



// -------------------------------------------------------------------------------------------------
// Users
// -------------------------------------------------------------------------------------------------

// On transforme les users avec un mot de passe hashé :
// { firstname, lastname, email, password: "mot de passe en clair" } 
// => { firstname, lastname, email, password: "mot de passe hashé" }
const usersWithHashedPasswords = await Promise.all(usersData.map(async (user) => {
    const { password, ...rest } = user;
    return {
      ...rest,
      password: await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10)
    };
}));

// On enregistre les users dans la base
const users = await prisma.user.createManyAndReturn({
  data: usersWithHashedPasswords
});


// -------------------------------------------------------------------------------------------------
// Categories
// -------------------------------------------------------------------------------------------------

// On transforme :
// { name } => { name, userId }
const categories = await prisma.category.createManyAndReturn({
  data: categoriesData.map(category => ({ name: category.name, userId: users[0].id }))
});


// -------------------------------------------------------------------------------------------------
// Expenses
// -------------------------------------------------------------------------------------------------

// On transforme :
// { label, data, amount, description, userId, category: "string" } 
// => { label, data, amount, description, userId, categoryId: number } 
const expenses = await prisma.expense.createManyAndReturn({
  data: expensesData.map(expense => {
    // On récupère tout dans "rest" sauf category qui est une string (nous on veut l'id)
    const { category, ...rest } = expense; 
    return {
      ...rest,
      categoryId: categories.find(c => c.name === expense.category)?.id ?? 0,
      userId: users[0]?.id ?? 0
    };
  })
});
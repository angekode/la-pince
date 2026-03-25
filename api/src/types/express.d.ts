// ---------------------------------------------------------
// EXTENSION DU TYPE Request D'EXPRESS
// ---------------------------------------------------------
// Ce fichier permet d'ajouter la propriété "user" à req.user
// afin que TypeScript ne signale plus d'erreur dans les controllers.
// Cette propriété est ajoutée par le middleware d'authentification.
//
// NOTE : On garde volontairement ce fichier séparé pour éviter
// d'éparpiller les types dans le projet.
// ---------------------------------------------------------

// Optionnel : si on veux typer plus tard avec Prisma
// import type { User } from "../db/prisma-client";

import { BudgetPostBody } from "../middlewares/budgets.middleware.ts";


declare global {
  namespace Express {
    interface Request {
       // On ajoute une propriété user optionnelle à Request, qui contient au minimum un id (le userId extrait du token).
       // On peut aussi ajouter d'autres champs comme email, role, etc. selon les besoins.
      user?: {    // ← rendre optionnel
        id: number;
        email?: string;
      };
      budgetPostBody?: BudgetPostBody;
    }
  }
}
// Obligatoire pour que TypeScript traite ce fichier comme un module et applique les déclarations globales.
export {};



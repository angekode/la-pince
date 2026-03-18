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

// Optionnel : si tu veux typer plus tard avec Prisma
// import type { User } from "../db/prisma-client";

declare global {
  namespace Express {
    interface Request {
      user?: {    // ← rendre optionnel
        id: number;
        email?: string;
      };
    }
  }
}

export {};



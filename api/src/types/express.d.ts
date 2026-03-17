// ici j'étends le type Request d'Express"
// pour que TypeScript arrête de me signaler des erreurs quand j'utilise req.user

import type { User } from "../db/prisma-client"; // si je veux typer plus tard

declare global {
  namespace Express {
    interface Request {
      user?: {      // ← rendre optionnel
        id: number;
        email?: string;
      };
    }
  }
}

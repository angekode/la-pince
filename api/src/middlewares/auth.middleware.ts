// J'importe uniquement les TYPES d'Express
// Avec verbatimModuleSyntax, j'utilise 'import type'
import type { Request, Response, NextFunction } from "express";

// J'importe ma fonction verifyToken
// Comme on est en ESM, j'ajoute bien l'extension .js
import { verifyToken } from "../utils/jwt.js";


// Je crée un type personnalisé pour ajouter req.user
// Cela permet à TypeScript de comprendre que req.user existe
export interface AuthRequest extends Request {
  user?: any;
}

// Voici mon middleware d'authentification
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  // Grace au cookie-parser qui inclu le token dans cookies
  const token = req.cookies.token;

  // Si jamais token est undefined → erreur propre
  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    // Je vérifie et décode le token
    // Ici token est garanti comme string → plus d'erreur TS
    const decoded = verifyToken(token);

    // J'attache les infos du token à req.user
    req.user = decoded;

    // Tout est bon, je passe au middleware suivant
    next();

  } catch (error) {
    // Si verifyToken échoue → token invalide
    return res.status(403).json({ message: "Token invalide" });
  }
}






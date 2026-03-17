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
  // Je récupère le header Authorization
  const authHeader = req.headers.authorization;

  // Si pas de header ou pas de Bearer → erreur
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // Je récupère le token après "Bearer "
  const token = authHeader.split(" ")[1];

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






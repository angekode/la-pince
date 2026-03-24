// Importation uniquement les TYPES d'Express pour typer correctement le middleware
// Avec verbatimModuleSyntax, utilisation de 'import type'
import type { Request, Response, NextFunction } from "express";

// Importation de la fonction verifyToken qui vérifie et décode le JWT
// Comme on est en ESM ,ajout de l'extension .js
import { verifyToken } from "../utils/jwt.js";


// Création d'un type personnalisé qui étend Request pour inclure req.user
// Cela permet à TypeScript de comprendre que req.user existe après l'authentification et d'avoir son type 
// (ici any, mais on pourrait faire mieux en définissant une interface User).
export interface AuthRequest extends Request {
  user?: any;
}

// Middleware d'authentification
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  // Grâce à cookie-parser, le token est disponible dans req.cookies.token
  const token = req.cookies.token;

  // Si jamais token est undefined (pas présent dans les cookies) → erreur propre : 401 Unauthorized (accès refusé)
  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    // Vérification et décodage du token (si le token est invalide, verifyToken va lancer une erreur et on passera dans le catch)
    // Ici token est garanti comme string → plus d'erreur TS
    const decoded = verifyToken(token);

    // On attache les infos du token à req.user pour les utiliser dans les routes protégées (ex: req.user.id)
    req.user = decoded;

    // Tout est bon, on passe au middleware suivant
    next();

  } catch (error) {
    // Si verifyToken échoue → token invalide
    return res.status(403).json({ message: "Token invalide" });
  }
}






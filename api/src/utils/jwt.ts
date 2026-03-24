//Import de jsonwebtoken pour pouvoir créer et vérifier des JWT
import jwt from "jsonwebtoken";

// Clé secrète depuis .env (en production), utilisée pour signer les tokens, 
// sinon on utilise une valeur par défaut en dev"
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// éfinir la durée de validité du token : ici 7 jours
const JWT_EXPIRES_IN = "7d";

// ------------------------------------------------------
// Fonction pour SIGNER un token (générer un JWT)
// ------------------------------------------------------

export function signToken(payload: object): string {
  // Création d'un token avec payload, clé secrète et date d'expiration
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// ------------------------------------------------------
// Fonction pour VÉRIFIER un token (décoder + valider)
// ------------------------------------------------------
export function verifyToken(token: string): any {
  // Vérification que le token est valide et renvoie son contenu
  return jwt.verify(token, JWT_SECRET);
}


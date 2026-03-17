// Je me dis : "j'importe jsonwebtoken pour pouvoir créer et vérifier des JWT"
import jwt from "jsonwebtoken";

// Je me dis : "je récupère ma clé secrète depuis .env, sinon j'utilise une valeur par défaut en dev"
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Je me dis : "je définis la durée de validité du token : ici 7 jours"
const JWT_EXPIRES_IN = "7d";

// ------------------------------------------------------
// Fonction pour SIGNER un token (générer un JWT)
// ------------------------------------------------------
export function signToken(payload: object): string {
  // Je me dis : "je crée un token avec mon payload, ma clé secrète et une date d'expiration"
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// ------------------------------------------------------
// Fonction pour VÉRIFIER un token (décoder + valider)
// ------------------------------------------------------
export function verifyToken(token: string): any {
  // Je me dis : "je vérifie que le token est valide et je renvoie son contenu"
  return jwt.verify(token, JWT_SECRET);
}


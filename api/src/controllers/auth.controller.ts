// J'importe les types Request et Response d'Express pour typer correctement mes fonctions de contrôleur.
import type { Request, Response } from "express";

// J'importe bcrypt pour pouvoir hasher les mots de passe et comparer les hash.
import bcrypt from "bcrypt";

// J'importe PrismaClient pour interagir avec ma base de données via Prisma.
import { PrismaClient } from "@prisma/client";

// J'importe ma fonction signToken qui génère un JWT pour l'utilisateur.
import { signToken } from "../utils/jwt.js";

// J'importe le type AuthRequest, qui étend Request pour inclure req.user (ajouté par le middleware d'auth).
import type { AuthRequest } from "../middlewares/auth.middleware.js";

// Je crée une instance de PrismaClient pour pouvoir faire des requêtes à la base.
const prisma = new PrismaClient();

// Je définis le nombre de rounds pour bcrypt (plus c'est haut, plus c'est sécurisé mais lent).
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;


// -----------------------------
// POST /auth/register
// -----------------------------
export async function register(req: Request, res: Response) {
  try {
    // Je récupère les données envoyées par le front dans le body de la requête.
    const { email, password, firstName, lastName } = req.body;

    // Je vérifie que l'email et le mot de passe sont bien fournis.
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe obligatoires" });
    }

    // Je vérifie si un utilisateur existe déjà avec cet email.
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Je hash le mot de passe avant de le stocker en base (jamais stocker un mot de passe en clair).
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Je crée l'utilisateur dans la base avec Prisma.
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, firstname : firstName, lastname : lastName },
      // Je sélectionne uniquement les champs que je veux renvoyer (pas le mot de passe).
      select: { id: true, email: true, firstname: true, lastname: true }
    });

    // Je renvoie l'utilisateur créé avec un statut 201 (created).
    return res.status(201).json({ 
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email
    });

  } catch (error) {
    // Si quelque chose plante, j'affiche l'erreur dans la console pour debug.
    console.error("Register error:", error);
    // Et j'envoie une erreur 500 au front.
    return res.status(500).json({ message: "Erreur serveur" });
  }
}



// -----------------------------
// POST /auth/login
// -----------------------------
export async function login(req: Request, res: Response) {
  try {
    // Je récupère l'email et le mot de passe envoyés par le front.
    const { email, password } = req.body;

    // Je cherche l'utilisateur correspondant à cet email.
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Je compare le mot de passe envoyé avec le hash stocké en base.
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Si tout est bon, je génère un token JWT contenant l'id et l'email.
    const token = signToken({ id: user.id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true, // non accessible via javascript coté client avec document.cookie (attaque XSS)
      secure: process.env.NODE_ENV !== "production", // secure = true => cookie envoyé uniquement en HTTPS (pour la prod),
      sameSite: "lax", // cross-site: cookie envoyé en GET mais pas en POST
      path: "", // coockie envoyé sur toutes les routes
      maxAge: 24 * 1000 * 60 * 60, // durée de vie de 24h 
    });
    // Je renvoie l'utilisateur (sans le mot de passe) + le token.
    return res.status(200).json({
        id: user.id,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname
    });

  } catch (error) {
    // En cas d'erreur, je log et je renvoie une erreur serveur.
    console.error("Login error:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}



// -----------------------------
// POST /auth/logout
// -----------------------------
export async function logout(req: AuthRequest, res: Response) {
  // Le logout est géré côté front (on supprime le token).
   res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    sameSite: "lax",
    path: "",
  });
  // Ici je renvoie juste un message de confirmation.
  return res.status(200).json({ message: "Déconnecté" });
}



// -----------------------------
// GET /auth/me
// -----------------------------
export async function me(req: AuthRequest, res: Response) {
  try {
    // Je récupère l'id de l'utilisateur injecté par le middleware d'auth.
    const userId = req.user.id;

    // Je récupère les infos de l'utilisateur en base.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstname: true, lastname: true }
    });

    // Si l'utilisateur n'existe pas, je renvoie une erreur.
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Sinon je renvoie ses infos.
    return res.status(200).json({
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email
    });

  } catch (error) {
    // En cas d'erreur, je log et je renvoie une erreur serveur.
    console.error("Me error:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// Importation des types Request et Response d'Express pour typer correctement les fonctions du contrôleur.
import type { Request, Response } from "express";

// Importer bcrypt pour pouvoir hasher les mots de passe et comparer les hash.
//import bcrypt from "bcrypt";
import argon2 from "argon2";

// Importer PrismaClient pour interagir avec la base de données via Prisma.
import { PrismaClient } from "@prisma/client";

// Fonction utilitairesignToken qui génère un JWT pour l'utilisateur.
import { signToken } from "../utils/jwt.js";

// Type AuthRequest, qui étend Request pour inclure req.user (ajouté par le middleware d'auth).
import type { AuthRequest } from "../middlewares/auth.middleware.js";

// Création d'une instance de PrismaClient pour pouvoir faire des requêtes à la base (requètes DB).
const prisma = new PrismaClient();

// Nombre de rounds pour bcrypt (plus c'est haut, plus c'est sécurisé mais lent - sécurité du hash).
// const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;


// -----------------------------
// POST /auth/register
// -----------------------------

export async function register(req: Request, res: Response) {
  try {
    // Récupération des données envoyées par le front dans le body de la requête.
    const { email, password, firstName, lastName } = req.body;

    // Vérification des champs obligatoires : l'email et mot de passe sont bien fournis.
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe obligatoires" });
    }

    // Vérification si l'utilisateur existe déjà avec cet email.
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe avant de le stocker en base (jamais stocker un mot de passe en clair).
    //const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const hashedPassword = await argon2.hash(password);


    // Création de l'utilisateur dans la base avec Prisma.
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, firstname : firstName, lastname : lastName },
      // Sélection uniquement des champs qu'on veux renvoyer (pas le mot de passe).
      select: { id: true, email: true, firstname: true, lastname: true }
    });

    // Renvoi de l'utilisateur créé avec un statut 201 (created). --> Réponse au client
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
    // Récupération de l'email et du mot de passe envoyés par le front.
    const { email, password } = req.body;

    // Recherche de l'utilisateur correspondant à cet email.
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Comparaison du mot de passe envoyé avec le hash stocké en base. --> Vérification de l'authentification
    //const isValid = await bcrypt.compare(password, user.password);
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Si tout est bon, génération d'un token JWT contenant l'id et l'email.
    const token = signToken({ id: user.id, email: user.email });

    // Envoi du cookie HTTPOnly avec le token d'authentification. --> Stockage du token dans un cookie sécurisé
    res.cookie("token", token, {
      httpOnly: true,                     // non accessible via javascript coté client avec document.cookie (attaque XSS)
      secure: process.env.NODE_ENV !== "production", // secure = true => cookie envoyé uniquement en HTTPS (pour la prod),
      sameSite: "lax",                    // cross-site: cookie envoyé en GET mais pas en POST
      path: "",                           // coockie envoyé sur toutes les routes
      maxAge: 24 * 1000 * 60 * 60,        // durée de vie de 24h 
    });
    // Renvoi de l'utilisateur (sans le mot de passe) + le token.
    return res.status(200).json({
        id: user.id,            
        email: user.email,          
        firstName: user.firstname,        
        lastName: user.lastname     
    });

  } catch (error) {
    // En cas d'erreur, log et renvoie d'une erreur serveur.
    console.error("Login error:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// -----------------------------
// POST /auth/logout
// -----------------------------

export async function logout(req: AuthRequest, res: Response) {
  // Le logout est géré côté front (on supprime le token).
  const isProd = process.env.NODE_ENV === "production";
   res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", 
    path: "/",
  });
  // Ici renvoie d'un message de confirmation.
  return res.status(200).json({ message: "Déconnecté" });
}

// -----------------------------
// GET /auth/me
// -----------------------------

export async function me(req: AuthRequest, res: Response) {
  try {
    // Récupération de l'id de l'utilisateur injecté par le middleware d'auth.
    const userId = req.user.id;

    // Récupération des infos de l'utilisateur en base.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstname: true, lastname: true }
    });

    // Si l'utilisateur n'existe pas, renvoie d'une erreur.
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Sinon renvoie de ses infos.
    return res.status(200).json({
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email
    });

  } catch (error) {
    // En cas d'erreur, log et renvoie d'une erreur serveur.
    console.error("Me error:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

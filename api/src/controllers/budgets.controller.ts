import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../db/prisma-client.ts";


// ---------------------------------------------------------
// GET /budgets
// ---------------------------------------------------------

// Renvoie la liste des budgets, mais uniquement ceux de l'utilisateur authentifié qui fait la requête
export async function getAllBudgets(req: Request, res: Response) {

  try {

    // Si req.user est undefined c'est qu'on a oublié d'appeller le authMiddleware
    if (!req.user) {
      throw new Error("user undefined, middleware non appellé");
    }

    // On filtre les résultats sur l'utilisateur
    const userId = req.user.id;

    const rawBudgetsFromDatabase = await prisma.budget.findMany({ 
      // On ajoute le nom de la catégorie en clair en plus de categoryId grâce à la liaison avec la
      // table category
      include: { 
        category: {
          select: { name: true } 
        } 
      }
    });

    // Le nom en clair de la catégorie est dans un sous objet category.name, on écrase la structure
    // avant de l'envoyer :
    // { id, limit, categoryId, userId, category: {name}}  => { id, limit, userId, category } 
    const formatedBudget = rawBudgetsFromDatabase.map(raw => ({
      id: raw.id,
      limit: raw.limit,
      category: raw.category.name,
      userId: raw.userId
    }));

    return res.status(StatusCodes.OK).json({
      count: formatedBudget.length,
      budgets: formatedBudget
    });

  // Gestion d'erreurs
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: String(error) });
    }
  }
}
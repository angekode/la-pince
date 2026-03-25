import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../db/prisma-client.ts";
import { Prisma } from "@prisma/client";

import { stripUndefined } from "../utils/optional-objects.ts";


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
      userId: raw.userId,
      alertEnabled: raw.alertEnabled
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


// ---------------------------------------------------------
// GET /budgets/:id
// ---------------------------------------------------------

// Renvoie la liste des budgets, mais uniquement ceux de l'utilisateur authentifié qui fait la requête
export async function getBudgetById(req: Request, res: Response) {

  try {

    // Si req.user est undefined c'est qu'on a oublié d'appeller le authMiddleware
    if (!req.user) {
      throw new Error("user undefined, middleware non appellé");
    }

    const budgetId = Number(req.params.id);
    if (isNaN(budgetId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: `L'identifiant du budget est invalide`});
    }


    // On filtre les résultats sur l'utilisateur
    const userId = req.user.id;

    const rawBudgetFromDatabase = await prisma.budget.findUnique({ 
      where: { id: budgetId },
      // On ajoute le nom de la catégorie en clair en plus de categoryId grâce à la liaison avec la
      // table category
      include: { 
        category: {
          select: { name: true } 
        } 
      }
    });

    if (!rawBudgetFromDatabase) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }

    // Le nom en clair de la catégorie est dans un sous objet category.name, on écrase la structure
    // avant de l'envoyer :
    // { id, limit, categoryId, userId, category: {name}}  => { id, limit, userId, category } 
    const { categoryId, ...formatedBudget }  = { 
      ...rawBudgetFromDatabase, 
      category: rawBudgetFromDatabase.category.name 
    };

    return res.status(StatusCodes.OK).json(formatedBudget);

  // Gestion d'erreurs
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: String(error) });
    }
  }
}


// ---------------------------------------------------------
// POST /budgets/:id
// ---------------------------------------------------------

// Crée un budget 
export async function createBudget(req: Request, res: Response) {

  try {

    // Si req.user est undefined c'est qu'on a oublié d'appeller le authMiddleware
    if (!req.user) {
      throw new Error("user undefined, middleware non appellé");
    }
    
    // Contenu de la requête inséré dans req par le middleware
    if (!req.budgetPostBody) {
      throw new Error("budgetPostBody non défini, middleware non appellé");
    }

    // Crée une nouveau budget dans la base et envoie une exception en cas de problèmes
    const newBudgetEntry = await prisma.budget.create({ 
      data: { 
      ...req.budgetPostBody, // contient { limit, categoryId }
      userId: req.user.id // on assigne le budget à l'utilisateur authentifié
      }
    });

    return res.status(StatusCodes.CREATED).json(newBudgetEntry);

  // Gestion d'erreurs
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: String(error) });
    }
  }
}


// ---------------------------------------------------------
// PATCH /budgets/:id
// ---------------------------------------------------------

// Crée un budget 
export async function updateBudget(req: Request, res: Response) {

  try {

    // Si req.user est undefined c'est qu'on a oublié d'appeller le authMiddleware
    if (!req.user) {
      throw new Error("user undefined, middleware non appellé");
    }

    const budgetId = Number(req.params.id);
    if (isNaN(budgetId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: `Identifiant du budget invalide`});
    }
    
    // Contenu de la requête inséré dans req par le middleware
    if (!req.budgetPatchBody) {
      throw new Error("budgetPostBody non défini, middleware non appellé");
    }

    // L'objet json dans la requête peut avoir des champs undefined (les valeurs optionnelles)
    // Mais prisma.model.update() n'aime pas ça, on les élimine
    const updateData = stripUndefined(req.budgetPatchBody);

    // Met à jour le budger dans la base et envoie une exception en cas de problèmes
    const updatedBudgetEntry = await prisma.budget.update({ 
      where : {
        id: budgetId
      },
      data: updateData
    });

    return res.status(StatusCodes.OK).json(updatedBudgetEntry);

  // Gestion d'erreurs
  } catch (error: unknown) {

    // Erreurs Prisma
    // https://www.prisma.io/docs/orm/reference/error-reference#prismaclientknownrequesterror
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Entrée innexistante: https://www.prisma.io/docs/orm/reference/error-reference#p2025
      if (error.code === 'P2025') {
        return res.status(StatusCodes.NOT_FOUND).end();
      }

    } else if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: String(error) });
    }
  }
}


// ---------------------------------------------------------
// DELETE /budgets/:id
// ---------------------------------------------------------

// Crée un budget 
export async function removeBudget(req: Request, res: Response) {

  try {

    // Si req.user est undefined c'est qu'on a oublié d'appeller le authMiddleware
    if (!req.user) {
      throw new Error("user undefined, middleware non appellé");
    }

    const budgetId = Number(req.params.id);
    if (isNaN(budgetId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: `Identifiant du budget invalide`});
    }
    
    // Supprime le budget de la base et envoie une exception en cas de problèmes
    await prisma.budget.delete({ where: { id: budgetId }});

    return res.status(StatusCodes.NO_CONTENT).end();

  // Gestion d'erreurs
  } catch (error: unknown) {

    // Erreurs Prisma
    // https://www.prisma.io/docs/orm/reference/error-reference#prismaclientknownrequesterror
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Entrée innexistante: https://www.prisma.io/docs/orm/reference/error-reference#p2025
      if (error.code === 'P2025') {
        return res.status(StatusCodes.NOT_FOUND).end();
      }

    // Autres erreurs
    } else if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: String(error) });
    }
  }
}
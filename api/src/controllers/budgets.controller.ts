import type { Request, Response } from "express";
import { prisma } from "../db/prisma-client.ts";
import { StatusCodes } from "http-status-codes";


// ---------------------------------------------------------
// GET /budgets
// ---------------------------------------------------------

// Renvoie la liste des budgets, mais uniquement ceux de l'utilisateur authentifié qui fait la requête
export async function getAllBudgets(req: Request, res: Response) {

  try {

    if (!req.user) {
      throw new Error("user undefined, middleware non appellé");
    }

    // On filtre les résultats sur l'utilisateur
    const userId = req.user.id;
    const budgets = await prisma.budget.findMany({ where: { userId: req.user.id } });
  
    return res.status(StatusCodes.OK).json({
      count: budgets.length,
      budgets
    });


  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: String(error) });
    }
  }
}
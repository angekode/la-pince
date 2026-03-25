/**
 * Regroupe les middlewares qui vérifient le format des données envoyés dans le corp des requêtes
 * pour le budgets est valide.
 */

import zod from "zod";
import { ZodError } from "zod";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


const postBodyScheme = zod.object({
  categoryId: zod.number(),
  limit: zod.number()
});
export type BudgetPostBody = zod.infer<typeof postBodyScheme>;


/**
 * Vérifie le contenu du corps de la requête POST /budgets
 */
export function validatePostBody(req: Request, res: Response, next: NextFunction) {

  try {
    const body = postBodyScheme.parse(req.body); // envoie une exception si le corps est invalide
    req.budgetPostBody = body;
    
    next(); // appelle le controlleur

  } catch(error: unknown) {
    if (error instanceof ZodError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Le format des données dans le body est invalide : ${error.message}`})
    } 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erreur interne du serveur'});
  }
}
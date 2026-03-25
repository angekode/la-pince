import { Router } from "express";

// Middleware d'authentification : toutes les routes sont protégées
import { authMiddleware } from "../middlewares/auth.middleware.ts";

// Import des contrôleurs de catégories
import {
  getAllBudgets
} from "../controllers/budgets.controller.ts";

const router = Router();

// Toutes les routes de ce router nécessitent d'être authentifiées (avoir un token JWT valide en cookie)
router.use(authMiddleware);

/**
 * Swagger : GET /budgets
 * Renvoie toutes les budgets de l'utilisateur connecté
 * @openapi
 * /budget:
 *   get:
 * 
 *     summary: Renvoie la liste des budgets de l'utilisateur connecté
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 *       Seul les catégories de l'utilisateur connecté sont renvoyées.
 * 
 *     security:
 *        - cookieAuth: []
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count: 
 *                   type: number
 *                 budgets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       limit:
 *                         type: number
 *                       category:
 *                         type: string
 */
router.get("/", getAllBudgets);

export default router;


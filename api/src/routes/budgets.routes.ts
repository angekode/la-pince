import { Router } from "express";

// Middleware d'authentification : toutes les routes sont protégées
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { validatePostBody, validatePatchBody } from "../middlewares/budgets.middleware.ts";

// Import des contrôleurs de catégories
import {
  getAllBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  removeBudget
} from "../controllers/budgets.controller.ts";

const router = Router();

// Toutes les routes de ce router nécessitent d'être authentifiées (avoir un token JWT valide en cookie)
router.use(authMiddleware);

/**
 * Swagger : GET /budgets
 * Renvoie toutes les budgets de l'utilisateur connecté
 * @openapi
 * /budgets:
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


/**
 * Swagger : GET /budgets/:id
 * Renvoie les informations d'une catégorie spécifique de l'utilisateur connecté
 * @openapi
 * /budgets/{id}:
 *   get:
 * 
 *     summary: Renvoie les informations sur un budget
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 *       Seulement les catégories appartenant à l'utilisateur peuvent être renvoyées.
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du budget
 *         schéma:
 *           type: number
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
 *                 id:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 category:
 *                   type: string
 */
router.get("/:id", getBudgetById);


/**
 * Swagger : POST /budgets
 * Crée un nouveau budget pour l'utilisateur connecté
 * @openapi
 * /budgets:
 *   post:
 * 
 *     summary: Crée un nouveau budget
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 * 
 *     security:
 *        - cookieAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: [name]
 *               properties:
 *                 categoryId:
 *                   type: number
 *                 limit:
 *                   type: number
 * 
 *     responses:
 *       200: 
 *         description: Crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 category:
 *                   type: string
 */
router.post("/", validatePostBody, createBudget);


/**
 * Swagger : PATCH /budget/:id
 * Met à jour une catégorie existante de l'utilisateur connecté
 * @openapi
 * /budget/{id}:
 *   patch:
 * 
 *     summary: Met à jour la limite d'un budget
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 *       Seulement les budgets appartenant à l'utilisateur peuvent être modifiées.
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du budget
 *         schéma:
 *           type: number
 * 
 *     security:
 *        - cookieAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: [name]
 *               properties:
 *                 limit:
 *                   type: number
 * 
 *     responses:
 *       200: 
 *         description: Mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 category:
 *                   type: string
 */
router.patch("/:id", validatePatchBody, updateBudget);


/**
 * Swagger : DELETE /budgets/:id
 * Supprime une catégorie existante de l'utilisateur connecté
 * @openapi
 * /budgets/{id}:
 *   delete:
 * 
 *     summary: Supprime le budget
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 *       Seulement les catégories appartenant à l'utilisateur peuvent être supprimées.
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de le budget
 *         schéma:
 *           type: number
 * 
 *     security:
 *        - cookieAuth: []
 * 
 *     responses:
 *       204: 
 *         description: Supprimé avec succès
 */
router.delete("/:id", removeBudget);

export default router;


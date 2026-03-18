import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const router = Router();

// Toutes les routes nécessitent l'authentification
router.use(authMiddleware);

/**
 * @openapi
 * /categories:
 *   get:
 * 
 *     summary: Renvoie la liste des catégories de l'utilisateur connecté
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
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       userId:
 *                         type: number
 */
router.get("/", getAllCategories);


/**
 * @openapi
 * /categories/{id}:
 *   get:
 * 
 *     summary: Renvoie les informations sur une catégorie
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 *       Seulement les catégories appartenant à l'utilisateur peuvent être renvoyées.
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la catégorie
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
 *                 name:
 *                   type: string
 *                 userId:
 *                   type: number
 */
router.get("/:id", getCategoryById);

/**
 * @openapi
 * /categories:
 *   post:
 * 
 *     summary: Crée une nouvelle catégorie
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
 *                 name:
 *                   type: string
 *                   description: Nom de la catégorie (entre 2 et 50 caractères).
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
 *                 name:
 *                   type: string
 *                 userId:
 *                   type: number
 */
router.post("/", createCategory);


/**
 * @openapi
 * /categories/{id}:
 *   patch:
 * 
 *     summary: Met à jour le nom de la catégorie
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 *       Seulement les catégories appartenant à l'utilisateur peuvent être modifiées.
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la catégorie
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
 *                 name:
 *                   type: string
 *                   description: Nom de la catégorie (entre 2 et 50 caractères).
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
 *                 name:
 *                   type: string
 *                 userId:
 *                   type: number
 */
router.patch("/:id", updateCategory);


/**
 * @openapi
 * /categories/{id}:
 *   delete:
 * 
 *     summary: Supprime la catégorie
 *     description: > 
 *       Seul les utilisateurs avec un token en cookie sont autorisés sur cette route.
 *       Seulement les catégories appartenant à l'utilisateur peuvent être supprimées.
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la catégorie
 *         schéma:
 *           type: number
 * 
 *     security:
 *        - cookieAuth: []
 * 
 *     responses:
 *       204: 
 *         description: Supprimée avec succès
 */
router.delete("/:id", deleteCategory);



export default router;

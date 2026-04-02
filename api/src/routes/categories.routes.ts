import { Router } from "express";

// Middleware d'authentification : toutes les routes sont protégées
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Import des contrôleurs de catégories
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const router = Router();

// Toutes les routes de ce router nécessitent d'être authentifiées (avoir un token JWT valide en cookie)
router.use(authMiddleware);

/**
 * Swagger : GET /categories
 * Renvoie toutes les catégories de l'utilisateur connecté
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
 *                       colorCode:
 *                         type: string
 */
router.get("/", getAllCategories);


/**
 * Swagger : GET /categories/:id
 * Renvoie les informations d'une catégorie spécifique de l'utilisateur connecté
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
 *                 colorCode:
 *                   type: string
 */
router.get("/:id", getCategoryById);


/**
 * Swagger : POST /categories
 * Crée une nouvelle catégorie pour l'utilisateur connecté
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
 *               required: [name, colorCode]
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nom de la catégorie (entre 2 et 50 caractères).
 *                 colorCode:
 *                   type: string
 *                   description: Code de la couleur au format #FFFFFF / #000000 utilisée pour l'affichage
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
 *                 colorCode:
 *                   type: string
 */
router.post("/", createCategory);


/**
 * Swagger : PATCH /categories/:id
 * Met à jour une catégorie existante de l'utilisateur connecté
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
 *                 colorCode:
 *                   type: string
 *                   description: Code de la couleur au format #FFFFFF / #000000 utilisée pour l'affichage
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
 *                 colorCode:
 *                   type: string
 */
router.patch("/:id", updateCategory);


/**
 * Swagger : DELETE /categories/:id
 * Supprime une catégorie existante de l'utilisateur connecté
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

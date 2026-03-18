import { Router } from "express";
import { authMiddleware} from "../middlewares/auth.middleware.js";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactions.controller.js";

const router = Router();

/**
 * @openapi
 * /transactions:
 *   get:
 *
 *     summary: Renvoie la liste des transactions de l'utilisateur connecté
 *     description: >
 *       Seul les utilisateurs avec un token en cookie sont autorises sur cette route.
 *       Seul les transactions de l'utilisateur connecté sont renvoyées.
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
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       label:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       date:
 *                         type: string
 *                       categoryId:
 *                         type: number
 *                       userId:
 *                         type: number
 *                       description:
 *                         type: string
 */
router.get("/", authMiddleware, getAllTransactions);


/**
 * @openapi
 * /transactions/{id}:
 *   get:
 *
 *     summary: Renvoie les informations sur une transaction
 *     description: >
 *       Seul les utilisateurs avec un token en cookie sont autorises sur cette route.
 *       Seulement les transactions appartenant a l'utilisateur peuvent etre renvoyees.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la transaction
 *         schema:
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
 *                 label:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *                 categoryId:
 *                   type: number
 *                 userId:
 *                   type: number
 *                 description:
 *                   type: string
 */
router.get("/:id", authMiddleware, getTransactionById);


/**
 * @openapi
 * /transactions:
 *   post:
 *
 *     summary: Cree une nouvelle transaction
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
 *               required: [amount, label, date, categoryId]
 *               properties:
 *                 amount:
 *                   type: number
 *                   description: Montant de la transaction (strictement positif).
 *                 label:
 *                   type: string
 *                   description: Libelle de la transaction.
 *                 date:
 *                   type: string
 *                   description: Date au format ISO datetime.
 *                 categoryId:
 *                   type: number
 *                   description: Identifiant de la categorie (entier positif).
 *                 description:
 *                   type: string
 *                   description: Informations supplémentaires
 *
 *     responses:
 *       201:
 *         description: Crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 label:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *                 categoryId:
 *                   type: number
 *                 userId:
 *                   type: number
 *                 description:
 *                   type: string
 */
router.post("/", authMiddleware, createTransaction);


/**
 * @openapi
 * /transactions/{id}:
 *   patch:
 *
 *     summary: Met a jour la transaction
 *     description: >
 *       Seul les utilisateurs avec un token en cookie sont autorises sur cette route.
 *       Seulement les transactions appartenant a l'utilisateur peuvent etre modifiees.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la transaction
 *         schema:
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
 *               properties:
 *                 amount:
 *                   type: number
 *                   description: Montant de la transaction (strictement positif).
 *                 label:
 *                   type: string
 *                   description: Libelle de la transaction.
 *                 date:
 *                   type: string
 *                   description: Date au format ISO datetime.
 *                 categoryId:
 *                   type: number
 *                   description: Identifiant de la categorie (entier positif).
 *                 description:
 *                   type: string
 *                   description: Informations supplémentaires.
 *     responses:
 *       200:
 *         description: Mise a jour avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.patch("/:id", authMiddleware, updateTransaction);


/**
 * @openapi
 * /transactions/{id}:
 *   delete:
 *
 *     summary: Supprime la transaction
 *     description: >
 *       Seul les utilisateurs avec un token en cookie sont autorises sur cette route.
 *       Seulement les transactions appartenant a l'utilisateur peuvent etre supprimees.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la transaction
 *         schema:
 *           type: number
 *
 *     security:
 *        - cookieAuth: []
 *
 *     responses:
 *       204:
 *         description: Supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;

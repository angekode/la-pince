// Je crée un router Express pour regrouper toutes mes routes d'auth
import { Router } from "express";

// J'importe tous mes contrôleurs d'authentification
import { register, login, logout, me } from "../controllers/auth.controller.js";

// J'importe mon middleware d'auth pour protéger certaines routes
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();



/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     description: A utiliser en 1er pour pouvoir se logger ensuite avec `/auth/login`.
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: [firstName, lastName, email, password]
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *       201:
 *         description: Utilisateur crée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: number
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 */
// Je me dis : "quand quelqu'un POST sur /auth/register → j'appelle mon contrôleur register"
router.post("/register", register);


/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Connecte un nouvel utilisateur
 *     description: >
 *       Permet de récupérer un token dans les cookies coté client. Il est utilisé dans toutes les routes 
 *       qui necessitent une authentification comme `/auth/me` ou `/auth/logout`.
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: [email, password]
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *       200:
 *         description: Utilisateur connecté
 *         headers: 
 *           Set-Cookie:
 *             description: Cookie contenant le token JWT nommé "token"
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 */
// Je me dis : "login ne nécessite pas d'être connecté"
router.post("/login", login);


/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Déconnecte l'utilisateur
 *     description: Le client doit envoyer le token généré à partir de la route /auth/login en tant que cookie
 *     security:
 *        - cookieAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur connecté
 *         headers: 
 *           Set-Cookie:
 *             description: Cookie contenant le token JWT
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 */
// Je me dis : "logout nécessite d'être connecté → j'ajoute authMiddleware"
router.post("/logout", authMiddleware, logout);


/**
 * @openapi
 * /auth/me:
 *   post:
 *     summary: Renvoie les informations d'un utilisateur connecté
 *     description: Le client doit envoyer le token généré à partir de la route /auth/login en tant que cookie
 *     security:
 *        - cookieAuth: []
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
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 */
// Je me dis : "la route /me renvoie les infos de l'utilisateur connecté"
router.get("/me", authMiddleware, me);

export default router;

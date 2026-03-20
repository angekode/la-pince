// Router Express pour regrouper toutes les routes d'authentification
import { Router } from "express";

// Import des contrôleurs d'authentification
import { register, login, logout, me } from "../controllers/auth.controller.js";

// Middleware d'authentification pour protéger certaines routes
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();



/**
 * Documentation Swagger pour /auth/register
 * Cette route permet de créer un nouvel utilisateur
 * Le client doit envoyer un JSON avec les champs firstName, lastName, email et password
 * En cas de succès, renvoie un JSON avec les informations de l'utilisateur créé (sans le mot de passe)
 * En cas d'erreur (ex: email déjà utilisé), renvoie un message d'erreur    
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
// "quand quelqu'un POST sur /auth/register → appel le contrôleur register"
router.post("/register", register);


/**
 * Documentation Swagger pour /auth/login
 * Cette route permet de connecter un utilisateur existant et de générer un cookie JWT
 * Le client doit envoyer un JSON avec les champs email et password 
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
// "login ne nécessite pas d'être connecté"
router.post("/login", login);


/**
 * Documentation Swagger pour /auth/logout
 * Cette route permet de déconnecter un utilisateur en supprimant le cookie JWT -> middleware d'auth obligatoire
 * Le client doit envoyer le token généré à partir de la route /auth/login en tant que cookie
 * En cas de succès, renvoie un message de confirmation
 * En cas d'erreur (ex: token manquant ou invalide), renvoie un message d'erreur
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
// "logout nécessite d'être connecté → ajoute de authMiddleware"
router.post("/logout", authMiddleware, logout);


/**
 * Documentation Swagger pour /auth/me
 * Cette route permet de récupérer les informations de l'utilisateur connecté à partir du token JWT
 * Le client doit envoyer le token généré à partir de la route /auth/login en tant que cookie
 * @openapi
 * /auth/me:
 *   get:
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
// "la route /me renvoie les infos de l'utilisateur connecté"
router.get("/me", authMiddleware, me);

export default router;

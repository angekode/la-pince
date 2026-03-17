// Je crée un router Express pour regrouper toutes mes routes d'auth
import { Router } from "express";

// J'importe tous mes contrôleurs d'authentification
import { register, login, logout, me } from "../controllers/auth.controller.js";

// J'importe mon middleware d'auth pour protéger certaines routes
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


// Je me dis : "quand quelqu'un POST sur /auth/register → j'appelle mon contrôleur register"
router.post("/register", register);

// Je me dis : "login ne nécessite pas d'être connecté"
router.post("/login", login);

// Je me dis : "logout nécessite d'être connecté → j'ajoute authMiddleware"
router.post("/logout", authMiddleware, logout);

// Je me dis : "la route /me renvoie les infos de l'utilisateur connecté"
router.get("/me", authMiddleware, me);

export default router;

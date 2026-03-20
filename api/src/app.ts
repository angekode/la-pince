// Création de l'application Express (contient les middlewares et les routes)
import express from "express";

// Middleware CORS pour autoriser le frontend à communiquer avec l'API
import cors from "cors";

// Routes d'authentification
import authRoutes from "./routes/auth.routes.js";

// Routes des catégories
import categoriesRouter from "./routes/categories.routes.js";

// Lecture des cookies HTTPOnly
import cookieParser from "cookie-parser";

// Swagger UI pour afficher la documentation API
import swaggerUi from 'swagger-ui-express';

// Spécification OpenAPI générée par swagger-jsdoc
import { openapiSpec } from './swagger/generate-api-doc.ts';

// Initialisation de l'application Express
const app = express();

// Configuration CORS (OBLIGATOIRE pour frontend React)
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// ✅ JSON
// Permet de pouvoir lire du JSON dans les requêtes
app.use(express.json());

// Intègre le contenu des cookies dans req.cookies et facilite la manipulation des valeurs
// Permet de lire les cookies dans req.cookies, notamment les cookies HTTPOnly (ex: token d'authentification)
app.use(cookieParser());

// Documentation Swagger accessible sur /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Toutes les routes d'auth commencent par /auth
app.use("/auth", authRoutes);

// Route simple pour tester le serveur
app.get('/', (req, res) => res.send('hello'));

// toutes les routes de categories commencent par /categories
app.use("/categories", categoriesRouter);

// Export de l'application pour être utilisée dans index.ts
export default app;


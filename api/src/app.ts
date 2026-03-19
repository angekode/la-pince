// Je crée mon application Express ici, c'est elle qui va contenir toutes mes routes
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { openapiSpec } from './swagger/generate-api-doc.ts';

const app = express();

//CORS (OBLIGATOIRE pour frontend React)
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// ✅ JSON
// Je veux pouvoir lire du JSON dans mes requêtes
app.use(express.json());

// Intègre le contenu des cookies dans req.cookies et facilite la manipulation des valeurs
app.use(cookieParser());



app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// toutes les routes d'auth commencent par /auth
app.use("/auth", authRoutes);

app.get('/', (req, res) => res.send('hello'));

// toutes les routes de categories commencent par /categories
app.use("/categories", categoriesRouter);


export default app;


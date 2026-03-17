// Je crée mon application Express ici, c'est elle qui va contenir toutes mes routes
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// Je veux pouvoir lire du JSON dans mes requêtes
app.use(express.json());

app.use(cookieParser());

// toutes les routes d'auth commencent par /auth
app.use("/auth", authRoutes);

app.get('/', (req, res) => res.send('hello'));

// toutes les routes de categories commencent par /categories
app.use("/categories", categoriesRouter);

// Ancienne version 
// app.get('/', (req, res) => res.send('hello'));

export default app;


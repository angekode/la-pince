// Je crée mon application Express ici, c'est elle qui va contenir toutes mes routes
import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Je me dis : "ok, je veux pouvoir lire du JSON dans mes requêtes"
app.use(express.json());

// Je me dis : "toutes les routes d'auth commencent par /auth"
app.use("/auth", authRoutes);

// Ancienne version (si jamais j'avais mis des routes ici)
// app.get('/', (req, res) => res.send('hello'));

export default app;


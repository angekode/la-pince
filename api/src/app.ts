// Je crée mon application Express ici, c'est elle qui va contenir toutes mes routes
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import transactionsRouter from "./routes/transactions.routes.ts";
import cookieParser from "cookie-parser";



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

// On installe la documentation Swagger uniquement pour le dévelopement
// Swagger est installé en dev dependancies, donc le build est cassé si utilisé en prod
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = await import('swagger-ui-express');
  const { openapiSpec } = await import('./swagger/generate-api-doc.ts');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
}

// toutes les routes d'auth commencent par /auth
app.use("/auth", authRoutes);

app.get('/', (req, res) => res.send('hello'));

// toutes les routes de categories commencent par /categories
app.use("/categories", categoriesRouter);

// toutes les routes de transactions commencent par /transactions
app.use("/transactions", transactionsRouter);


export default app;


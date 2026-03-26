// Création de l'application Express (contient les middlewares et les routes)
import express from "express";

// Middleware CORS pour autoriser le frontend à communiquer avec l'API
import cors from "cors";

// Routes d'authentification
import authRoutes from "./routes/auth.routes.js";

// Routes des catégories
import categoriesRouter from "./routes/categories.routes.js";

import transactionsRouter from "./routes/transactions.routes.ts";
import budgetsRouter from "./routes/budgets.routes.ts";

// Lecture des cookies HTTPOnly
import cookieParser from "cookie-parser";


// Initialisation de l'application Express
const app = express();


/**
 * Configuration CORS (OBLIGATOIRE pour frontend React)
 * 
 * Quand le frontend et le backend sont sur la même origin (même url), alors les requêtes et les
 * cookies sont envoyés sans problèmes.
 * Mais ici l'origin est différente entre front et back :
 * origin = protocole + hote + port 
 * ex : http://localhost:3000 <-> http://localhost:5173 => cross origin (origine différente car port différent)
 * 
 * En cas de cross origin, le navigateur ne lie pas les réponses du serveur. Il faut donc faire 3 choses :
 * - Définir la politique CORS (Cross Origin Ressource Sharing).
 * - Indiquer qu'il faut envoyer les cookies.
 * - Bien configurer les cookies lors de leur création dans les controlleurs /auth (res.cookie)
 * 
 */
app.use(
  cors({
    /*
      origin = true
      - Autorise le navigateur à lire les réponses pour les requêtes qui viennent de de chez lui.
        Concrêtement il renvoie un header: Access-Control-Allow-Origin: http://localhost:5173 dans chaque requête.
        Le comportement apparait similaire à origin: *, mais credentials = true ne le permet pas.
      origin = *
      - Autorise le navigateur à lire les réponses des toutes les origines. Mais incompatible avec 
        creadentials = true car pas assez safe.
     */
    origin: process.env.NODE_ENV === "production" 
      // En production, l'adressese de front autorisées ex: 'https://la-pince-1suz.onrender.com'
      ? process.env.PRODUCTION_CLIENT_URL
      // En dev on autorise toutes les adresses (on copie l'adresse du front en vrai)
      : true, 

    /*
      credentials = true
      - Autorise le navigateur à envoyer les cookies (alors qu'on est en cross origin)
      - Concrêtement il envoie un header: Access-Control-Allow-Credentials dans chaque requête.

      Attention, coté front les appels fetch doivent préciser l'option credentials: "include".
    */
    credentials: true
  })
);


// ✅ JSON
// Permet de pouvoir lire du JSON dans les requêtes
app.use(express.json());

// Intègre le contenu des cookies dans req.cookies et facilite la manipulation des valeurs
// Permet de lire les cookies dans req.cookies, notamment les cookies HTTPOnly (ex: token d'authentification)
app.use(cookieParser());

// On installe la documentation Swagger uniquement pour le dévelopement
// Swagger est installé en dev dependancies, donc le build est cassé si utilisé en prod
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = await import('swagger-ui-express');
  const { openapiSpec } = await import('./swagger/generate-api-doc.ts');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
}

// Toutes les routes d'auth commencent par /auth
app.use("/auth", authRoutes);

// Route simple pour tester le serveur
app.get('/', (req, res) => res.send('hello'));

// toutes les routes de categories commencent par /categories
app.use("/categories", categoriesRouter);

app.use("/transactions", transactionsRouter);

app.use("/budgets", budgetsRouter);

// Export de l'application pour être utilisée dans index.ts
export default app;


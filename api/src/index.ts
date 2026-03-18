// Je charge les variables d'environnement (PORT, DATABASE_URL, etc.)
import "dotenv/config";

// Je récupère mon app Express déjà configurée (routes, middlewares, etc.)
import app from "./app.js";

// Je récupère Prisma pour tester la connexion à la base
import { prisma } from "./db/prisma-client.js";



async function start() {
  try {
    // Je teste la connexion à la base avant de lancer le serveur
    await prisma.$connect();
    console.log("DB: connected");

    // Je récupère le port depuis .env (ou 3000 par défaut)
    const port = process.env.PORT || 3000;

    // Je lance mon serveur Express (celui défini dans app.ts)
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    // Si quelque chose se passe mal, je veux le voir clairement
    console.error("❌ Impossible de démarrer le serveur :", error);
  }
}

// Je démarre tout
start();

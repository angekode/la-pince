//  Chargement des variables d'environnement (.env : PORT, DATABASE_URL, etc.)
import "dotenv/config";

// Import de l'application app Express configurée (routes, middlewares, etc.)
import app from "./app.js";

// Import du client Prisma pour tester la connexion DB (tester la connexion à la base)
import { prisma } from "./db/prisma-client.js";


// Fonction asynchrone de démarrage du serveur
async function start() {
  try {
    // Teste la connexion à la base de donnéesavant de lancer le serveur
    await prisma.$connect();
    console.log("DB: connected");

    // Récupération du port depuis .env (ou 3000 par défaut)
    const port = process.env.PORT || 3000;

    // Lancement du serveur Express (celui défini dans app.ts)
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
   // Gestion des erreurs de démarrage (ex: échec de connexion à la DB)
    console.error("❌ Impossible de démarrer le serveur :", error);
  }
}

// Démarrage de l'application
start();

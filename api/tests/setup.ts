import { before, after } from 'node:test';
import { execSync } from 'node:child_process';
import app from '../src/app';
import { Server } from 'node:net';

let server : Server | undefined;

/**
 * Lance un conteneur docker pour lancer une base de donnée vierge.
 * Il faut définir les variables POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB et DATABASE_URL
 */
before(async () => {

  // Arrête et supprime le conteneur crée par un test précédant
  try {
    execSync(`docker rm -f lapince-db-test`);
  } catch (error) {}

  // Lance le conteneur
  execSync(`docker run -d --name lapince-db-test -e POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD} -e POSTGRES_USER=${process.env.POSTGRES_USER} -e POSTGRES_DB=${process.env.POSTGRES_DB} -p 5433:5432 postgres:18-alpine`);
  console.log('Docker container started');
  
  // Attend que la base soit prête
  await waitForDatabaseReady();

  // Création des tables
  execSync(`npx prisma migrate dev --name test`); // utilisera process.env.DATABASE_URL pour trouver la base de données
  console.log('Migrate command launched')

  // Lancement du serveur test
  server = app.listen(process.env.PORT, () => console.log('serveur test à l\'écoute'));
  await wait(1000);
});


/**
 * Arrête le conteneur de la base de données
 */
after(() => {
  execSync(`docker rm -f lapince-db-test`);
  server?.close();
});


/**
 * Permer d'attendre que la base de données soit prête
 */
async function waitForDatabaseReady() {

  let connected = false;
  let tryCount = 0;
  while (!connected && tryCount < 10) {
    await wait(200);
    tryCount++;
    try {
      execSync(`docker exec lapince-db-test pg_isready -U ${process.env.POSTGRES_USER} -d ${process.env.POSTGRES_DB}`);
      connected = true;
    } catch (error) { }
  }
  if (!connected) {
    throw('Failed to connect to database');
  }
}


/**
 * Fonction d'attente
 */
async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
import { before, after } from 'node:test';
import { execSync } from 'node:child_process';


before(async () => {
  // Remove old container if exists (crash during previous tests)
  try {
    execSync(`docker rm -f lapince-db-test`);
  } catch (error) {}

  // Empty database
  execSync(`docker run -d --name lapince-db-test -e POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD} -e POSTGRES_USER=${process.env.POSTGRES_USER} -e POSTGRES_DB=${process.env.POSTGRES_DB} -p 5433:5432 postgres:18-alpine`);
  console.log('Docker container started');
  
  // Check if database is launched
  await waitForDatabaseReady();

  // Create tables
  execSync(`npx prisma migrate dev`); // will use process.env.DATABASE_URL to find the database
  console.log('Migrate command launched')
});


after(() => {
  // Stop and delete container
  execSync(`docker rm -f lapince-db-test`);
});



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
    throw('Failed to connect to database')
  }
}


async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
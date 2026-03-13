import express from 'express';
import config from 'dotenv/config';
import { prisma } from './db/prisma-client.ts';


// Création de l'application express
const app = express();
app.get('/', (req, res) => res.send('hello'));
app.listen(process.env.PORT, () => console.log('serveur à l\'écoute'));

// Test prisma
await prisma.$connect();
console.log("DB: connected");
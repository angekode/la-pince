import express from 'express';
import config from 'dotenv/config';
import { prisma } from './db/prisma-client.ts';


// Création de l'application express
export const app = express();
app.get('/', (req, res) => res.send('hello'));
if (process.env.NODE_ENV !== 'TEST') {
  app.listen(process.env.PORT, () => console.log('serveur à l\'écoute'));
}

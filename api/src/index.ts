import express from 'express';
import config from 'dotenv/config';


const app = express();

app.get('/', (req, res) => res.send('hello'));

app.listen(process.env.PORT, () => console.log('serveur à l\'écoute'));
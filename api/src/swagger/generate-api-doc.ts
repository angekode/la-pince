import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'node:fs';
import path from 'node:path';

// Options de génération OpenAPI
const options = {
  definition: {
    openapi: '3.0.0',
    info: { 
      title: 'My API', 
      version: '1.0.0' 
    },
  },
  // Analyse les fichiers de routes pour extraire les commentaires Swagger
  apis: ['./src/routes/**/*.ts'],
};

// Génération de la spécification OpenAPI
export const openapiSpec = swaggerJSDoc(options);

// Dossier de sortie et nom du fichier pour la spécification générée
const outputDir = path.resolve('./doc');
const outputFile = path.join(outputDir, 'api-doc.json');

// Création du dossier s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Écriture du fichier JSON contenant la spec OpenAPI
fs.writeFileSync(outputFile, JSON.stringify(openapiSpec, null, 2));
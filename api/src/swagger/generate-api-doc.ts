import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'node:fs';
import path from 'node:path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'My API', version: '1.0.0' },
  },
  apis: ['./src/routes/**/*.ts'],
};

export const openapiSpec = swaggerJSDoc(options);

const outputDir = path.resolve('./doc');
const outputFile = path.join(outputDir, 'api-doc.json');

// Crée le dossier s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(openapiSpec, null, 2));
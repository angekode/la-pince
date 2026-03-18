import swaggerJSDoc from 'swagger-jsdoc';
//import fs from 'node:fs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'My API', version: '1.0.0' },
  },
  apis: ['./src/routes/**/*.ts'], // ou controllers, etc.
};

export const openapiSpec = swaggerJSDoc(options);

//fs.writeFileSync('./doc/api-doc.json', JSON.stringify(openapiSpec, null, 2));
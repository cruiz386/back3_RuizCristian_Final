import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Adoptme API',
            version: '1.0.0',
            description: 'Documentación de la API de Adoptme',
        },
    },
    apis: ['./docs/**/*.yaml'], 
};

const specs = swaggerJsdoc(options);

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(specs);
import swaggerJsdoc from 'swagger-jsdoc';
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fiap Tech Challenge Soat',
      version: '1.0.0',
      description: 'Projeto Fase I - SOAT turma I',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT ?? 3000}/api` }
    ]
  },
  apis: ['**/routers/*.*'],
};

const specs = swaggerJsdoc(options);

export default specs;

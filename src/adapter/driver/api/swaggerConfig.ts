import swaggerJsdoc from 'swagger-jsdoc';
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fiap Tech Challenge Soat',
      version: '1.0.0',
      description: 'Projeto pos arquitetura de software',
    },
    servers: [
      { url: 'http://localhost:3000/api' }
    ]
  },
  apis: ['src/adapter/driver/api/routers/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;

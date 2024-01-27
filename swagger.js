import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    info: {
      title: 'Your API',
      version: '3.0.0',
      description: 'Your API description',
    },
  },
  apis: ['./allRouter.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

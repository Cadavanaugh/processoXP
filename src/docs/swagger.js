const swaggerAutogen = require('swagger-autogen')();

const outputFile = 'src/docs/swagger.json';
const endpointsFiles = ['src/index.js'];

swaggerAutogen(outputFile, endpointsFiles)
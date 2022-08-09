const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const path = require("path");

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'school API',
      description: 'Quran schools API Information',
      contact: {
        name: 'Amazing Developer',
      },
      servers: ['http://localhost:4000'],
    },
  },
  // ['.routes/*.js']
  apis: ['app.js', 'routes/schoolRoutes.js', 'routes/userRoutes.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route imports
const schools = require('./routes/schoolRoutes');
const users = require('./routes/userRoutes');
const schoolDemand = require('./routes/schoolDemandRoutes');

app.use('/api', schools);
app.use('/api', users);
app.use('/api', schoolDemand);

//middleware for errors
app.use(errorMiddleware);

module.exports = app;

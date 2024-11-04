const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');
const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const { sync } = require('./config/database.js');

require('dotenv').config()


const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Ejemplo',
            version: '1.0.0',
            description: 'Documentación de la API de ejemplo con Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor local',
            },
        ],
        components: {
                securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Formato del token (opcional)
                },
                },
            },
    },
    apis: ['./routes/*.js']
};

const swaggerBase = swagger(swaggerOptions);

app.use(bodyParser.json());

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerBase));

app.use(helmet());
app.use(helmet.contentSecurityPolicy(
    {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'https://fonts.googleapis.com']
        }
        
    }
))

app.use("/auth", authRouter);

app.use('/users', usersRouter);

sync();

module.exports = { app };

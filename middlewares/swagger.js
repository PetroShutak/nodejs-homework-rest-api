/**
 * Swagger options object for API documentation.
 * @typedef {Object} SwaggerOptions
 * @property {Object} definition - The definition object for the Swagger API.
 * @property {string} definition.openapi - The version of the OpenAPI specification.
 * @property {Object} definition.info - The info object for the Swagger API.
 * @property {string} definition.info.title - The title of the Swagger API.
 * @property {string} definition.info.version - The version of the Swagger API.
 * @property {string} definition.info.description - The description of the Swagger API.
 * @property {Array} definition.servers - The servers array for the Swagger API.
 * @property {Object} definition.servers.url - The URL of the server for the Swagger API.
 * @property {Array} apis - The array of API routes for the Swagger API.
 */

/**
 * Swagger options object for API documentation.
 * @type {SwaggerOptions}
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'My API Documentation'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
    },
    apis: ['./routes/api/*.js'],
};

  module.exports = swaggerOptions;
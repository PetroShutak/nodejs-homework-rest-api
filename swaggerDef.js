const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    baseUrl: "https://mongoose-contacts-reader.onrender.com",
    info: {
      title: "API Документація",
      version: "1.0.0",
      description: "Документація для Phonebook API",
    },
    servers: [
      {
        url: "https://mongoose-contacts-reader.onrender.com/",
      },
    ],
  },

  apis: ["./routes/api/*.js"], 
};

const specs = swaggerJSDoc(options);
module.exports = specs;

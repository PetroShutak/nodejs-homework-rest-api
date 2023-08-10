require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST = process.env.DB_HOST;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Server running. Use our API on port: 3000");
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


//   require('dotenv').config();
// const mongoose = require('mongoose');
// const app = require('./app');

// const CONTACTS_DB_HOST = process.env.CONTACTS_DB_HOST; 
// const USERS_DB_HOST = process.env.USERS_DB_HOST; 

// mongoose.set('strictQuery', true);

// mongoose
//   .connect(CONTACTS_DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log('Contacts database connection successful');

//     
//     mongoose.connect(USERS_DB_HOST, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     }).then(() => {
//       console.log('Users database connection successful');

//       const PORT = process.env.PORT || 3000;
//       app.listen(PORT, () => {
//         console.log(`Server running. Use our API on port: ${PORT}`);
//       });
//     }).catch((error) => {
//       console.log('Error connecting to users database:', error.message);
//       process.exit(1);
//     });
//   })
//   .catch((error) => {
//     console.log('Error connecting to contacts database:', error.message);
//     process.exit(1);
//   });

const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://shutak:123456789qwerty@atlascluster.59eynnq.mongodb.net/contacts_reader?retryWrites=true&w=majority";

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

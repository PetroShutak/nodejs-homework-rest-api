const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const mongoose = require('mongoose');

// const DB_HOST = "mongodb+srv://shutak:123456789qwerty@atlascluster.59eynnq.mongodb.net/contacts_reader?retryWrites=true&w=majority";

// mongoose.connect(DB_HOST)
// .then(() => {
//   console.log('Database connection successful');
// })
// .catch((error) => {
//   console.log(error.message);
//   // process.exit(1);
// });



const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
});

module.exports = app;
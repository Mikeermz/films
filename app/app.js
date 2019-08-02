// Packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');

const { db, port } = require('./config')
console.log('hola');
const router = require('./routes');

// Call express
const app = express();

const logger = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(morgan(logger));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

mongoose.connect(db.url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
const mongo = mongoose.connection;

mongo.on('error', (error) => console.log('Failed to connect to mongo', error))
  .once('open', () => console.log('Conneted to mongo'));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});


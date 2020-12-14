require('newrelic');
/* eslint-disable no-console */
const express = require('express');
// const mongoCont = require('../controller/mongo.js');
const path = require('path');
const parser = require('body-parser');
// arangoDB connection
const arangoConnection = require('../controller/arango');
const db = require('../model/arango');

const app = express();
const PORT = 3002;

const publicPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(publicPath));
app.use(parser.json());

app.get('/api/listings/:id/price', arangoConnection.getPropertyPrice);
app.get('api/listings/:id/mortgages', arangoConnection.getMortgageList);
app.post('/api/listings/property', arangoConnection.addProperty);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// app.get('*/:id/db', mongoCont.get);
// app.get('dbs', mongoCont.getAll);

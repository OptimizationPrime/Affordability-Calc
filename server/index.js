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
const PORT = 7000;

const publicPath = path.join(__dirname, '..', 'client', 'dist');
app.use(parser.json());

// app.get('/:id', arangoConnection.getPropertyPrice);

app.get('/api/listings/:id/price', arangoConnection.getPropertyPrice);
app.get('/api/listings/:id/mortgages', arangoConnection.getMortgageList);
app.post('/api/listings/property', arangoConnection.addProperty);

const loaderio = path.join(__dirname, '..', '/loaderio-983a6ce265a42c6771d39df3ca010ea9');
app.get('/loaderio-983a6ce265a42c6771d39df3ca010ea9/', (req, res) => {
  res.status(200).sendFile(loaderio);
});

app.use('/:id', express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// app.get('*/:id/db', mongoCont.get);
// app.get('dbs', mongoCont.getAll);
// const loaderio = path.join(__dirname, '..', '/loaderio-984bcbae1693ba4f8fd8f4c137227358');
// app.get('/loaderio-984bcbae1693ba4f8fd8f4c137227358/', (req, res) => {
//   res.status(200).sendFile(loaderio);
// });

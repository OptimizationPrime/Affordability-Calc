/* eslint-disable no-console */
const { Database, aql } = require('arangojs');

const db = new Database({
  url: 'http://localhost:8529',
});

db.createDatabase('trulia').then(
  (info) => {
    console.log(info);
  },
  (err) => console.error(err.stack),
);

db.useDatabase('trulia');
db.useBasicAuth('root', '');



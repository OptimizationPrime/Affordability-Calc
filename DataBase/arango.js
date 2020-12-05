/* eslint-disable no-console */
// const { Database, aql } = require('arangojs');
// const graphModule = require('@arangodb/general-graph');

// const db = new Database({
//   url: 'http://localhost:8529',
// });

// db.createDatabase('trulia').then(
//   (info) => {
//     console.log(info);
//   },
//   (err) => console.error(err.stack),
// );

// db.useDatabase('trulia');
// db.useBasicAuth('root', '');

// db._create(Property);
// db._create(User);
// db._create(Mortgage);

const Property = {
  _key: 'auto generated string',
  _Id: 'Property/_key',
  address1: 'string',
  address2: 'string',
  city: 'string',
  states: 'string',
  zipcode: 'string',
  types: 'string',
  price: 'number',
};

const User = {
  _key: 'auto generated string',
  _Id: 'User/_key',
  lastName: 'sting',
  firstName: 'sting',
  email: 'sting',
  phoneNumber: 'sting',
};

const Mortgage = {
  _key: 'auto generated string',
  _Id: 'Mortgage/_key',
  _from: 'Property/_key',
  _to: 'User/_key',
  userId: 'string',
  downPayment: 'string',
  loanProgram: 'string',
  interestRate: 'string',
  createdAt: 'string',
};

/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 10000000;
const property = argv.output || './dataGen/json/properties.json';
const user = argv.output || './dataGen/json/users.json';
const mortgage = argv.output || './dataGen/json/mortgages.json';

const propertyStream = fs.createWriteStream(property);
const userStream = fs.createWriteStream(user);
const mortgageStream = fs.createWriteStream(mortgage);

const propertyIdPool = [];
const userIdPool = [];

// property data generation
const propertyType = ['Single family home', 'Townhouse', 'Condo - 4 or fewer stories', 'Condo - 5+ stories', 'Cooperative', 'Mobile or manufactured', 'Modular', 'Leasehold'];

const createProperty = (line) => {
  const _key = line.toString();
  propertyIdPool.push(_key);
  const address1 = faker.address.streetAddress();
  const address2 = faker.address.secondaryAddress();
  const city = faker.address.city();
  const states = faker.address.state();
  const zipcode = faker.address.zipCode();
  const types = faker.random.arrayElement(propertyType);
  const price = faker.random.number({ min: 100000, max: 30000000 });

  return {
    _key,
    address1,
    address2,
    city,
    states,
    zipcode,
    types,
    price,
  };
};

// user data generation
const createUser = (line) => {
  const _key = line.toString();
  userIdPool.push(line.toString());
  const name = faker.name.findName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.phoneNumberFormat();

  return {
    _key,
    name,
    email,
    phoneNumber,
  };
};

// mortgage data generation
const loanType = ['30 year fixed', '20 year fixed', '15 year fixed', '10 year fixed', '7/1 ARM', '5/1 ARM', '3/1 ARM'];

const createMortgage = (line) => {
  const _key = line.toString();
  const _from = faker.random.arrayElement(userIdPool);
  const _to = faker.random.arrayElement(propertyIdPool);
  const downPayment = faker.finance.amount(0.0, 0.5, 2);
  const loanProgram = faker.random.arrayElement(loanType);
  const interestRate = faker.finance.amount(2.50, 6.50, 2);
  const createdAt = faker.date.recent(90).toISOString();

  return {
    _key,
    _from,
    _to,
    downPayment,
    loanProgram,
    interestRate,
    createdAt,
  };
};

const startWritingProperty = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let ok = true;
    do {
      i -= 1;
      const post = JSON.stringify(createProperty(i));
      // check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        ok = writeStream.write(post, encoding);
      }
      writeStream.write('\n');
      // else call write and continue looping
    } while (i > 0 && ok);
    if (i > 0 && !ok) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

const startWritingUser = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let ok = true;
    do {
      i -= 1;
      const post = JSON.stringify(createUser(i));
      // check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        ok = writeStream.write(post, encoding);
      }
      writeStream.write('\n');
      // else call write and continue looping
    } while (i > 0 && ok);
    if (i > 0 && !ok) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

const startWritingMortgage = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let ok = true;
    do {
      i -= 1;
      const post = JSON.stringify(createMortgage(i));
      // check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        ok = writeStream.write(post, encoding);
      }
      writeStream.write('\n');
      // else call write and continue looping
    } while (i > 0 && ok);
    if (i > 0 && !ok) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

// header line in the csv file
// stream.write('test\n', 'utf-8');
startWritingProperty(propertyStream, 'utf-8', () => {
  console.time(`Execution time for Property data of ${lines}lines`);
  propertyStream.end();
  console.timeEnd(`Execution time for Property data of ${lines}lines`);
});

startWritingUser(userStream, 'utf-8', () => {
  console.time(`Execution time for User data of ${lines}lines`);
  userStream.end();
  console.timeEnd(`Execution time for User data of ${lines}lines`);
});

startWritingMortgage(mortgageStream, 'utf-8', () => {
  console.time(`Execution time for Mortgage data of ${lines}lines`);
  mortgageStream.end();
  console.timeEnd(`Execution time for Mortgage data of ${lines}lines`);
});

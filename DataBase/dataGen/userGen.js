const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');
const { v4: uuidv4 } = require('uuid');

const lines = argv.lines || 100;
const property = argv.output || 'properties.csv';
const user = argv.output || 'users.csv';
const mortgage = argv.output || 'mortgage.csv';

const propertyStream = fs.createWriteStream(property);
const userStream = fs.createWriteStream(user);
const mortgageStream = fs.createWriteStream(mortgage);

const propertyIdPool = [];
const userIdPool = [];

// property data generation
const propertyType = ['Single family home', 'Townhouse', 'Condo - 4 or fewer stories', 'Condo - 5+ stories', 'Cooperative', 'Mobile or manufactured', 'Modular', 'Leasehold'];

const createProperty = () => {
  const id = uuidv4();
  propertyIdPool.push(id);
  const address1 = faker.address.streetAddress();
  const address2 = faker.address.secondaryAddress();
  const city = faker.address.city();
  const states = faker.address.state();
  const zipcode = faker.address.zipCode();
  const types = faker.random.arrayElement(propertyType);
  const price = faker.random.number({min:100000, max:30000000});

  return `${id},${address1},${address2},${city},${states},${zipcode},${types},${zipcode},${price}\n`;
};

// user data generation
const createUser = () => {
  const id = uuidv4();
  userIdPool.push(id);
  const name = faker.name.findName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.phoneNumberFormat();

  return `${id},${name},${email},${phoneNumber}\n`;
};

// mortgage data generation
// CREATE TABLE affordability.Mortgage (
//   mortgageId   CHAR(10)    PRIMARY KEY,
//   propertyId   CHAR(10)    NOT NULL,
//   userId       CHAR(10)    NOT NULL,
//   downPayment  INT         NOT NULL,
//   loanProgram  VARCHAR(20) NOT NULL,
//   interestRate FLOAT       NOT NULL,
//   createdAt    DATE        NOT NULL,
//   FOREIGN KEY (propertyId) REFERENCES Property(propertyId),
//   FOREIGN KEY (userId)     REFERENCES User(userId),
//   UNIQUE (StudentID, ClassID)
// )




const createMortgage = () => {
  const id = uuidv4();
  const propertyId = faker.random.arrayElement(propertyIdPool);
  const userId = faker.random.arrayElement(userIdPool);
  const downPayment = faker.finance.amount(0, 1, 1);
  const loanProgram =
  const interestRate =
  const createdAt = faker.date.between(from, to);

  return `${id},${propertyId},${userId},${downPayment}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  const writing = () => {
    const canWrite = true;
    do {
      i -= 1;
      const property = createUser();
      if (i === 0) {
        writeStream.write(property, encoding, done);
      } else {
        writeStream.write(property, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  };
  writing();
};

stream.write(`name,email,phoneNumber\n`, 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
});

// CREATE TABLE affordability.Mortgage (
//   mortgageId   CHAR(10)    PRIMARY KEY,
//   propertyId   CHAR(10)    NOT NULL,
//   userId       CHAR(10)    NOT NULL,
//   downPayment  INT         NOT NULL,
//   loanProgram  VARCHAR(20) NOT NULL,
//   interestRate FLOAT       NOT NULL,
//   createdAt    DATE        NOT NULL,
//   FOREIGN KEY (propertyId) REFERENCES Property(propertyId),
//   FOREIGN KEY (userId)     REFERENCES User(userId),
//   UNIQUE (StudentID, ClassID)
// )

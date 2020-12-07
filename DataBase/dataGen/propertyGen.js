const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 100;
const fileName = argv.output || 'properties.csv';

const stream = fs.createWriteStream(fileName);

const propertyType = ['Single family home', 'Townhouse', 'Condo - 4 or fewer stories', 'Condo - 5+ stories', 'Cooperative', 'Mobile or manufactured', 'Modular', 'Leasehold'];

const propertyPrice = (min, max) => {
  const revMin = Math.ceil(min);
  const revMax = Math.floor(max);
  return Math.floor(Math.random() * (revMax - revMin + 1) + revMin);
};

const createProperty = () => {
  const address1 = faker.address.streetAddress();
  const address2 = faker.address.secondaryAddress();
  const city = faker.address.city();
  const states = faker.address.state();
  const zipcode = faker.address.zipCode();
  const types = propertyType[Math.floor(Math.random() * propertyType.length)];
  const price = propertyPrice(100000, 30000000);

  return `${address1},${address2},${city},${states},${zipcode},${types},${zipcode},${price}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  const writing = () => {
    const canWrite = true;
    do {
      i -= 1;
      const property = createProperty();
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

stream.write(`address1,address2,city,states,zipcode,types,zipcode,price\n`, 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
});

// CREATE TABLE affordability.User (
//   userId      CHAR(10)    PRIMARY KEY,
//   lastName    VARCHAR(30) NOT NULL,
//   firstName   VARCHAR(30) NOT NULL,
//   email       VARCHAR(50) NOT NULL,
//   phoneNumber VARCHAR(9)  NOT NULL,
// )

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

const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');
const { v4: uuidv4 } = require('uuid');

const lines = argv.lines || 100;
const property = argv.output || 'properties.csv';
const user = argv.output || 'users.csv';
const mortgage = argv.output || 'mortgages.csv';

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
  const price = faker.random.number({ min: 100000, max: 30000000 });

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
const loanType = ['30 year fixed', '20 year fixed', '15 year fixed', '10 year fixed', '7/1 ARM', '5/1 ARM', '3/1 ARM'];

const createMortgage = () => {
  const id = uuidv4();
  const propertyId = faker.random.arrayElement(propertyIdPool);
  const userId = faker.random.arrayElement(userIdPool);
  const downPayment = faker.finance.amount(0.0, 0.5, 2);
  const loanProgram = faker.random.arrayElement(loanType);
  const interestRate = faker.finance.amount(2.50, 6.50, 2);
  const createdAt = faker.date.recent(90);

  return `${id},${propertyId},${userId},${downPayment},${loanProgram},${interestRate},${createdAt}\n`;
};

const startWritingProperty = (writeStream, encoding, done) => {
  let i = lines;
  const writing = () => {
    const canWrite = true;
    do {
      i -= 1;
      const model = createProperty();
      if (i === 0) {
        writeStream.write(model, encoding, done);
      } else {
        writeStream.write(model, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  };
  writing();
};

const startWritingUser = (writeStream, encoding, done) => {
  let i = lines;
  const writing = () => {
    const canWrite = true;
    do {
      i -= 1;
      const model = createUser();
      if (i === 0) {
        writeStream.write(model, encoding, done);
      } else {
        writeStream.write(model, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  };
  writing();
};

const startWritingMortgage = (writeStream, encoding, done) => {
  let i = lines;
  const writing = () => {
    const canWrite = true;
    do {
      i -= 1;
      const model = createMortgage();
      if (i === 0) {
        writeStream.write(model, encoding, done);
      } else {
        writeStream.write(model, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  };
  writing();
};

propertyStream.write(`id,address1,address2,city,states,zipcode,types,zipcode,price\n`, 'utf-8');
userStream.write(`id,name,email,phoneNumber\n`, 'utf-8');
mortgageStream.write(`id,propertyId,userId,downPayment,loanProgram,interestRate,createdAt\n`, 'utf-8');

startWritingProperty(propertyStream, 'utf-8', () => {
  propertyStream.end();
});

startWritingUser(userStream, 'utf-8', () => {
  userStream.end();
});

startWritingMortgage(mortgageStream, 'utf-8', () => {
  mortgageStream.end();
});

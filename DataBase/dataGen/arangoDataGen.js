const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');
const { v4: uuidv4 } = require('uuid');

const lines = argv.lines || 10000000;
const property = argv.output || './dataGen/properties.csv';
const user = argv.output || './dataGen/users.csv';
const mortgage = argv.output || './dataGen/mortgages.csv';
// const table = argv.table || 'mortgage';

// eslint-disable-next-line no-console
console.time(`Execution time for Property data of ${lines}lines`);
// eslint-disable-next-line no-console
console.time(`Execution time for User data of ${lines}lines`);
// eslint-disable-next-line no-console
console.time(`Execution time for Mortgage data of ${lines}lines`);

const propertyStream = fs.createWriteStream(property);
const userStream = fs.createWriteStream(user);
const mortgageStream = fs.createWriteStream(mortgage);

const propertyIdPool = [];
const userIdPool = [];

// property data generation
const propertyType = ['Single family home', 'Townhouse', 'Condo - 4 or fewer stories', 'Condo - 5+ stories', 'Cooperative', 'Mobile or manufactured', 'Modular', 'Leasehold'];

const createProperty = (line) => {
  const id = line;
  propertyIdPool.push(id);
  const address1 = faker.address.streetAddress();
  const address2 = faker.address.secondaryAddress();
  const city = faker.address.city();
  const states = faker.address.state();
  const zipcode = faker.address.zipCode();
  const types = faker.random.arrayElement(propertyType);
  const price = faker.random.number({ min: 100000, max: 30000000 });

  return `${id},${address1},${address2},${city},${states},${zipcode},${types},${price}\n`;
};

// user data generation
const createUser = (line) => {
  const id = line;
  userIdPool.push(id);
  const name = faker.name.findName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.phoneNumberFormat();

  return `${id},${name},${email},${phoneNumber}\n`;
};

// mortgage data generation
const loanType = ['30 year fixed', '20 year fixed', '15 year fixed', '10 year fixed', '7/1 ARM', '5/1 ARM', '3/1 ARM'];

const createMortgage = (line) => {
  const id = line;
  const userId = faker.random.arrayElement(userIdPool);
  const propertyId = faker.random.arrayElement(propertyIdPool);
  const downPayment = faker.finance.amount(0.0, 0.5, 2);
  const loanProgram = faker.random.arrayElement(loanType);
  const interestRate = faker.finance.amount(2.50, 6.50, 2);
  const createdAt = faker.date.recent(90).toISOString();

  return `${id},${userId},${propertyId},${downPayment},${loanProgram},${interestRate},${createdAt}\n`;
};

const startWritingProperty = (writeStream, encoding, done) => {
  let i = lines;
  const writing = () => {
    let canWrite = true;
    do {
      i -= 1;
      const model = createProperty(i);
      if (i === 0) {
        writeStream.write(model, encoding, done);
      } else {
        canWrite = writeStream.write(model, encoding);
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
    let canWrite = true;
    do {
      i -= 1;
      const model = createUser(10000000 - i);
      if (i === 0) {
        writeStream.write(model, encoding, done);
      } else {
        canWrite = writeStream.write(model, encoding);
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
    let canWrite = true;
    do {
      i -= 1;
      const model = createMortgage(i);
      if (i === 0) {
        writeStream.write(model, encoding, done);
      } else {
        canWrite = writeStream.write(model, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  };
  writing();
};

// const execTimeMeasure = () => {
//   // const startTime = process.hrtime();
//   // eslint-disable-next-line no-console

//   if (table === 'property') {
//     propertyStream.write('propertyId,address1,address2,city,states,zipcode,types,price\n', 'utf-8');
//     startWritingProperty(propertyStream, 'utf-8', () => {
//       propertyStream.end();
//       // eslint-disable-next-line no-console
//       console.timeEnd(`Execution time for ${lines}lines`);
//     });
//   }

//   if (table === 'users') {
//     userStream.write('userId,name,email,phoneNumber\n', 'utf-8');
//     startWritingUser(userStream, 'utf-8', () => {
//       userStream.end();
//       // eslint-disable-next-line no-console
//       console.timeEnd(`Execution time for ${lines}lines`);
//     });
//   }

//   if (table === 'mortgage') {
//     mortgageStream.write('mortgageId,propertyId,userId,downPayment,loanProgram,interestRate,createdAt\n', 'utf-8');
//     startWritingMortgage(mortgageStream, 'utf-8', () => {
//       mortgageStream.end();
//       // eslint-disable-next-line no-console
//       console.timeEnd(`Execution time for ${Math.floor(lines / 3)}lines`);
//     });
//   }
// };

propertyStream.write('propertyId,address1,address2,city,states,zipcode,types,price\n', 'utf-8');
startWritingProperty(propertyStream, 'utf-8', () => {
  propertyStream.end();
  // eslint-disable-next-line no-console
  console.timeEnd(`Execution time for Property data of ${lines}lines`);
});

userStream.write('userId,name,email,phoneNumber\n', 'utf-8');
startWritingUser(userStream, 'utf-8', () => {
  userStream.end();
  // eslint-disable-next-line no-console
  console.timeEnd(`Execution time for User data of ${lines}lines`);
});

mortgageStream.write('mortgageId,_from,_to,downPayment,loanProgram,interestRate,createdAt\n', 'utf-8');
startWritingMortgage(mortgageStream, 'utf-8', () => {
  mortgageStream.end();
  // eslint-disable-next-line no-console
  console.timeEnd(`Execution time for Mortgage data of ${lines}lines`);
});

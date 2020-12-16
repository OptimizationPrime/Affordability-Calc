const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 10000000;
const property = argv.output || './dataGen/json/properties.json';
const user = argv.output || './dataGen/json/users.json';
const mortgage = argv.output || './dataGen/json/mortgages.json';
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




const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 10000;
const filename = argv.output || 'arangoUserData.json';
const stream = fs.createWriteStream(filename);

const createPost = (i) => {
  const _key = i.toString();
  const username = faker.internet.userName();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.phoneNumber();

  return {
    _key,
    username,
    firstName,
    lastName,
    email,
    phone,
  };
};

const seed = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let ok = true;
    do {
      i -= 1;
      const post = JSON.stringify(createPost(i));
      // check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        writeStream.write(post, encoding);
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


async function dataGen() {
  await seed(stream, 'utf8', () => {
    stream.end();
    console.log('finished seeding');
  });

  await seed(stream, 'utf8', () => {
    stream.end();
    console.log('finished seeding');
  });

  await seed(stream, 'utf8', () => {
    stream.end();
    console.log('finished seeding');
  });
}
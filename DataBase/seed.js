const fs = require('fs');
const faker = require('faker');
const argv = require('yargs').argv

const lines = argv.lines || 1000000;
const user = argv.output || 'users.csv';
const property = argv.output || 'properties.csv';
const mortgage = argv.output || 'mortgages.csv';

const writeStreamUser = fs.createWriteStream(user);
const writeStreamProperty = fs.createWriteStream(property);
const writeStreamMortgage = fs.createWriteStream(mortgage);

const createProperty = () => {
  const userId = faker.random.number(10)
  const title = faker.hacker.phrase()
  const content = faker.lorem.paragraph()
  const image = faker.image.image()
  const date = faker.date.recent()

  return `${userId},${title},${content},${image},${date}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines
  function writing(){
    let canWrite = true
    do {
      i--
      let post = createPost()
      //check if i === 0 so we would write and call `done`
      if(i === 0){
        // we are done so fire callback
        writeStream.write(post, encoding, done)
      }else{
        // we are not done so don't fire callback
        writeStream.write(post, encoding)
      }
      //else call write and continue looping
    } while(i > 0 && canWrite)
    if(i > 0 && !canWrite){
      //our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  writing()
}

//write our `header` line before we invoke the loop
stream.write(`userId,title,content,image,date\n`, 'utf-8')
//invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end()
})

CREATE TABLE affordability.Property (
  propertyId CHAR(10)    PRIMARY KEY,
  address1   VARCHAR(30) NOT NULL,
  address2   VARCHAR(30) NOT NULL,
  city       VARCHAR(30) NOT NULL,
  states     VARCHAR(30) NOT NULL,
  zipcode    VARCHAR(5)  NOT NULL,
  types      VARCHAR(30) NOT NULL,
  price      INT         NOT NULL,
)

CREATE TABLE affordability.User (
  userId      CHAR(10)    PRIMARY KEY,
  lastName    VARCHAR(30) NOT NULL,
  firstName   VARCHAR(30) NOT NULL,
  email       VARCHAR(50) NOT NULL,
  phoneNumber VARCHAR(9)  NOT NULL,
)

CREATE TABLE affordability.Mortgage (
  mortgageId   CHAR(10)    PRIMARY KEY,
  propertyId   CHAR(10)    NOT NULL,
  userId       CHAR(10)    NOT NULL,
  downPayment  INT         NOT NULL,
  loanProgram  VARCHAR(20) NOT NULL,
  interestRate FLOAT       NOT NULL,
  createdAt    DATE        NOT NULL,
  FOREIGN KEY (propertyId) REFERENCES Property(propertyId),
  FOREIGN KEY (userId)     REFERENCES User(userId),
  UNIQUE (StudentID, ClassID)
)

DROP DATABASE IF EXISTS trulia;

CREATE DATABASE trulia;

\c trulia

DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS mortgage;

CREATE TABLE property(
  id CHAR(36) PRIMARY KEY,
  address1 VARCHAR(30) NOT NULL,
  address2 VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  states VARCHAR(30) NOT NULL,
  zipcode VARCHAR(10)  NOT NULL,
  types VARCHAR(30) NOT NULL,
  price INT NOT NULL
);

CREATE TABLE users(
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phoneNumber VARCHAR(12) NOT NULL
);

CREATE TABLE mortgage(
  id CHAR(36) PRIMARY KEY,
  propertyId CHAR(36),
  userId CHAR(36),
  downPayment FLOAT NOT NULL,
  loanProgram VARCHAR(13) NOT NULL,
  interestRate FLOAT NOT NULL,
  createdAt DATE NOT NULL,
  FOREIGN KEY (propertyId) REFERENCES property(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

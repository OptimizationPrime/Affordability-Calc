#!/bin/bash

###################################################
# Bash script to create database and seed
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
DATABASE="trulia"
USER="shortdaddy"

# Output Filename for Faker File
FILEPATH1="$DIR/dataGen/properties.csv"
FILEPATH2="$DIR/dataGen/users.csv"
FILEPATH3="$DIR/dataGen/mortgages.csv"

# Table Name for COPY
TABLE1="property"
TABLE2="users"
TABLE3="mortgage"

### Import Our Database ###
# Dont specify a database since CREATE DATABASE and CREATE TABLE is in postgresql.sql
SCHEMA="$DIR/schema/postgresql.sql"
psql -U $USER -d postgres -a < $SCHEMA

### Run Our Generator Script ###
# node generator.js --output=$FILEPATH --lines=$LINES
node dataGen/dataGen.js --table=$TABLE2 --lines=10000000

### Import Our posts.csv file to seed Database ###
# psql -U $USER -d $DATABASE -c "COPY $TABLE1 FROM '$FILEPATH1' DELIMITER ',' CSV HEADER";

psql -U $USER -d $DATABASE -c "COPY $TABLE2 FROM '$FILEPATH2' DELIMITER ',' CSV HEADER";

# psql -U $USER -d $DATABASE -c "COPY $TABLE3 FROM '$FILEPATH3' DELIMITER ',' CSV HEADER";
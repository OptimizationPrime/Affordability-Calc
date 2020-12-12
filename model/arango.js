/* eslint-disable no-console */
const { Database, aql } = require('arangojs');

const db = new Database();

// switching to the new database
db.useDatabase('trulia');

// user authentication
db.useBasicAuth('root', '');

const findMortgageList = (id, callback) => {
  db.query(aql`
    FOR p IN property
        FILTER p._key == ${id}
            FOR m IN mortgage
                FILTER p._id == m._to
                    FOR u IN users
                        FILTER m._from == u._id
                            SORT m.createdAt
                                RETURN { name: u.name, city: p.city, states: p.states, createdat: m.createdAt }
`).then(
    (cursor) => cursor.all(),
  ).then(
    (result) => callback(null, result),
    (err) => callback(err),
  );
};

const findPropertyPrice = (id, callback) => {
  db.query(aql`
    FOR p IN property
        FILTER p._key == ${id}
            RETURN { price: p.price }
  `).then(
    (cursor) => cursor.all(),
  ).then(
    (result) => callback(null, result),
    (err) => callback(err),
  );
};

const createProperty = () => {

};

module.exports = {
  findMortgageList,
  findPropertyPrice,
  createProperty,
};

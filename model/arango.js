/* eslint-disable no-console */
const { aql, Database } = require('arangojs');
const auth = require('../authentication');

const db = new Database({
  url: 'http://54.215.245.140:8529',
  databaseName: 'trulia',
  auth: { username: auth.username, password: auth.password },
});

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

const createProperty = (doc, callback) => {
  db.query(aql`
    INSERT ${doc} INTO property
  `).then(
    (cursor) => cursor.all(),
  ).then(
    (result) => callback(null, result),
    (err) => callback(err),
  );
};

module.exports = {
  findMortgageList,
  findPropertyPrice,
  createProperty,
};

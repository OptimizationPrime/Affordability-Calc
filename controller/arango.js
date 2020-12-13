/* eslint-disable no-console */
const db = require('../model/arango');

module.exports = {
  getMortgageList: (req, res) => {
    db.findMortgageList(req.params.id, (err, data) => {
      if (err) {
        res.status(404);
      } else {
        res.status(200).send(data);
      }
    });
  },
  getPropertyPrice: (req, res) => {
    db.findPropertyPrice(req.params.id, (err, data) => {
      if (err) {
        res.status(404);
      } else {
        res.status(200).send(data);
      }
    });
  },
  addProperty: (req, res) => {
    console.log(req.body);
    db.createProperty(req.body, (err, data) => {
      if (err) {
        res.status(404);
      } else {
        res.status(200).send(data);
      }
    });
  },

};

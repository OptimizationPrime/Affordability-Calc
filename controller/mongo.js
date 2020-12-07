/* eslint-disable array-callback-return */
const schema = require('../DataBase/schema');
const mongo = require('../DataBase/mongo');

module.exports = {
  get: (req, res) => {
    mongo.connect();
    const query = schema.Price.where({ id: req.params.id });
    query.findOne((err, data) => {
      if (err) {
        res.status(404);
        mongo.db.close();
      } else {
        res.status(200).send(data);
        mongo.db.close();
      }
    });
  },
  getAll: (req, res) => {
    mongo.connect();
    schema.Price.find((err, data) => {
      if (err) {
        res.status(404);
      } else {
        res.status(200).send(data);
        mongo.db.close();
      }
    });
  },
};

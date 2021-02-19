'use strict';

const Repository = require('./repository');
const Service = require('./service');
const Controller = require('./controller');

module.exports = (db, dbutils) => {
  return Controller(Service(Repository(db, dbutils)));
};

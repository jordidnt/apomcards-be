'use strict';

const Repository = require('./repository');
const Service = require('./service');
const Controller = require('./controller');

module.exports = (db) => {
  return Controller(Service(Repository(db)));
};

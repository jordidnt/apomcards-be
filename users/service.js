'use strict';

module.exports = (repository) => {
  const service = {
    async getTestData() {
      return repository.getTestData();
    }
  };
  return service;
};

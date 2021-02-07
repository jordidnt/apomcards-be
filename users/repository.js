'use strict';

module.exports = (db) => {
  const testRef = db.collection('_test');

  const repository = {
    async getTestData() {
      const doc = await testRef.doc('HfIbFX2h9CIetXMD2Ssi').get();
      if (!doc.exists) {
        console.log('No such doc');
      } else {
        console.log('Doc data: ', doc.data());
        return doc.data();
      }
    },
  };
  return repository;
};

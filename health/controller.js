'use strict';

const {Router} = require('express');

module.exports = () => {
  const router = Router();

  router.get('/', (req, res, next) => {
    res.send('It\'s alive!');
  });

  return router;
};

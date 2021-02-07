'use strict';

const {Router} = require('express');

module.exports = () => {
  const router = Router();

  router.get('/', (req, res, next) => {
    res.send({
      hello: 'world'
    });
  });

  return router;
};

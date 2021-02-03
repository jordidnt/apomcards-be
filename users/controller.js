'use strict';

const express = require('express');

module.exports = () => {
  const router = express.Router();


  router.get('/:userID', async ({params: {userID}}, response, next) => {
    return response.status(200);
  });

  return router;
};

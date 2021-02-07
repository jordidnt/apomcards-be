'use strict';

const express = require('express');

module.exports = (service) => {
  const router = express.Router();


  // router.get('/:userID', async ({params: {userID}}, response, next) => {
  //   console.log(userID);
  //   return response.sendStatus(200);
  // });

  router.get('/test', async (request, response, next) => {
    const data = await service.getTestData();
    console.log('This is the data:');
    console.log(data);
    return response.send(data);
  });

  return router;
};

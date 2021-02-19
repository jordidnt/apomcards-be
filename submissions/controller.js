'use strict';

const express = require('express');

module.exports = (service) => {
  const router = express.Router();

  router.post('/', async ({ body }, response, next) => {
    console.log(body);
    if (!body.answer || !body.participantId || !body.roundId || !body.gameId) {
      return response.sendStatus(400);
    }

    const result = await service.createSubmission(
      body.gameId,
      body.roundId,
      body.participantId,
      body.answer
    );

    if (!result) {
      return response.sendStatus(500);
    }

    return response.send(201);
  });

  router.post('/read', async ({ body }, response, next) => {
    console.log(body);
    if (!body.submissionId || !body.roundId || !body.gameId) {
      return response.sendStatus(400);
    }

    const result = await service.markSubmissionRead(
      body.gameId,
      body.roundId,
      body.submissionId,
    );

    if (!result) {
      return response.sendStatus(500);
    }

    return response.send(201);
  });

  return router;
};

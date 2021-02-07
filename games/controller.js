'use strict';

const express = require('express');

module.exports = (service) => {
  const router = express.Router();

  router.post('/', async ({ body }, response, next) => {
    console.log(body);
    if (!body.questions || !body.duration) {
      return response.sendStatus(400);
    }

    const { newGameId, joinCode } = await service.createGame(body.questions, body.duration);
    if (!newGameId || !joinCode) {
      return response.sendStatus(500);
    }
    console.log('new game created:', newGameId, joinCode);
    return response.send({newGameId, joinCode}, 201);
  });

  router.post('/:joinCode/join', async ({ params, body }, response, next) => {
    if (!body.name || !params.joinCode) {
      return response.sendStatus(400);
    }
    console.log('Got to webserver');
    const result = await service.joinGame(params.joinCode, body.name);
    if (!result) {
      return response.sendStatus(404);
    }
    const { joinedGameId, participantId } = result;
    console.log('player joined game:', participantId, joinedGameId);

    return response.send({ joinedGameId, participantId }, 201);
  });

  router.post('/:gameId/start', async ({ params }, response, next) => {
    if (!params.gameId) {
      return response.sendStatus(400);
    }

    const result = await service.startGame(params.gameId);

    // result could be a 404 or a 500
    if (!result) {
      return response.sendStatus(404);
    }

    return response.sendStatus(200);

  });

  router.get('/:gameId', async (request, response, next) => {
    return response.sendStatus(200);
  });

  return router;
};

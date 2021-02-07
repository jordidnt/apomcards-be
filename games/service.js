'use strict';
const firebase = require('firebase-admin');

module.exports = (repository) => {
  const service = {
    async createGame(questions, duration) {
      // Create new game entry in db
      const { newGameId, joinCode } = await repository.createGame(duration);
      // Create rounds for each question
      await repository.createRoundsForGame(newGameId, questions); 
      return { newGameId, joinCode }
    },
    async joinGame(joinCode, name) {
      // retrieve the gameId for the joinCode from firebase
      const gameId = await repository.findGameIdByJoinCode(joinCode);
      if (!gameId) {
        return null;
      } 
      console.log(`${gameId} was found`);
      // create participant in the participants collection UNDER that gameId
      const participantId = await repository.createParticipantByGameId(gameId, name);
      console.log(`${participantId} was created`);

      // return new participantId and gameId
      return { joinedGameId: gameId, participantId};
    },
    async startGame(gameId) {
      const timestamp = firebase.firestore.Timestamp.now();
      const gameResult = await repository.setGameStarted(gameId, timestamp);
      const roundresult = await repository.setRoundStartedByGameId(gameId, 0, timestamp);
      if (!gameResult || !roundresult) {
        return null;
      }
      return true;
    }
  };
  return service;
};

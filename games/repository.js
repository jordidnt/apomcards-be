'use strict';

const { query } = require("express");

module.exports = (db, dbUtils) => {
  const gamesCollection = db.collection('games');
  // const roundsCollection = db.collection('rounds');

  const repository = {
    async createGame(duration) {
      const joinCode = dbUtils.generateJoinCode();
      const res = await gamesCollection.add({
        joinCode,
        startedAt: null,
        currentRound: null,
        roundDuration: duration,
      });
      return {
        newGameId: res.id,
        joinCode
      }
    },
    async createRoundsForGame(gameId, questions) {
      const roundsSubcollection = gamesCollection.doc(gameId).collection('rounds');
      questions.forEach(async (question, index) => {
        console.log('creating round: ', question);
        await roundsSubcollection.add({
          gameId,
          numberInRound: index,
          question,
          startedAt: null,
        });
      })
    },
    async findGameIdByJoinCode(joinCode) {
      const snapshot = await gamesCollection.where('joinCode', '==', joinCode).limit(1).get();
      if (!snapshot) {
        return null;
      }

      let gameId = null;
      snapshot.forEach(doc => {
        gameId = doc.id;
      })

      return gameId;
    },
    async createParticipantByGameId(gameId, name) {
      const participantsSubcollection = gamesCollection.doc(gameId).collection('participants');
      const res = await participantsSubcollection.add({
        gameId,
        name,
        points: 0,
      });

      return res.id;
    },
    async setGameStarted(gameId, timestamp) {
      const result = await gamesCollection.doc(gameId).update({
        startedAt: timestamp,
        currentRound: 0,
      })

      return result;
    },
    async setRoundStartedByGameId(gameId, roundNumber, timestamp) {
      const queryResult = await gamesCollection.doc(gameId).collection('rounds')
        .where('numberInRound', '==', roundNumber)
        .limit(1)
        .get()
      if (!queryResult) {
        return null;
      }

      const result = await queryResult.docs[0].ref.update({
          startedAt: timestamp,
        });

      return result;
    }
    // async createGame() {
    //   const doc = await testRef.doc('HfIbFX2h9CIetXMD2Ssi').get();
    //   if (!doc.exists) {
    //     console.log('No such doc');
    //   } else {
    //     console.log('Doc data: ', doc.data());
    //     return doc.data();
    //   }
    // },
    };

  return repository;
};

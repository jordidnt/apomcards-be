'use strict';
const firebase = require('firebase-admin');

module.exports = (repository) => {
  const service = {
    async createSubmission(gameId, roundId, participantId, answer) {
     return null;
    },
    async markSubmissionRead(gameId, roundId, submissionId) {
      return null;
    }
  };
  return service;
};

import Realm from 'realm';

import GameSchema from '../../models/GameSchema';
import ScoreSchema from '../../models/ScoreSchema';

// Realm.clearTestState();
const realm = new Realm({ schema: [GameSchema, ScoreSchema] });

const realmGames = realm.objects('Game');
const realmScores = realm.objects('Score');

const encodeGameData = (data) => {
  const decodedData = data;
  decodedData.playerIds = data.playerIds.join(',');
  return decodedData;
};

const decodeGameData = (data) => {
  const object = {};
  Object.keys(GameSchema.properties).forEach((property) => {
    object[property] = data[property];
  });
  object.playerIds = object.playerIds.split(',');

  return object;
};

const encodeScoreData = (data) => {
  const decodedData = data;
  return decodedData;
};

const decodeScoreData = (data) => {
  const object = {};
  Object.keys(ScoreSchema.properties).forEach((property) => {
    object[property] = data[property];
  });

  return object;
};

const Api = {
  /**
   * Game
   */
  fetchGames() {
    const games = realmGames.sorted('createdAt', true).map(game => decodeGameData(game));
    return Promise.resolve(games);
  },

  createGame(data) {
    return new Promise((resolve) => {
      realm.write(() => {
        const dataEncoded = encodeGameData(data);
        const lastGames = realmGames.sorted('createdAt', true);
        let lastGame = null;

        lastGames.forEach((game) => {
          if (!lastGame || parseInt(lastGame.id, 10) < parseInt(game.id, 10)) {
            lastGame = game;
          }
        });

        let id = '1';
        if (lastGame) {
          let intId = parseInt(lastGame.id, 10);
          intId += 1;
          id = intId.toString();
        }
        dataEncoded.id = id;
        const game = realm.create('Game', dataEncoded);
        resolve(decodeGameData(game));
      });
    });
  },

  updateGame(data) {
    return new Promise((resolve) => {
      const dataEncoded = encodeGameData(data);
      realm.write(() => {
        const game = realm.create('Game', dataEncoded);
        resolve(decodeGameData(game));
      });
    });
  },

  removeGame(id) {
    return new Promise((resolve) => {
      realm.write(() => {
        const games = realmGames.filtered(`id = "${id}"`);
        realm.delete(games);
        resolve(id);
      });
    });
  },

  /**
   * Score
   */
  fetchScores(id) {
    const scores = realmScores.filtered(`gameId = "${id}"`)
    .map(score => decodeScoreData(score));
    return Promise.resolve(scores);
  },

  createScore(data) {
    return new Promise((resolve) => {
      const dataEncoded = encodeScoreData(data);
      realm.write(() => {
        const existedScores = realmScores.filtered(`id = "${data.id}"`);
        realm.delete(existedScores);
        const score = realm.create('Score', dataEncoded);
        resolve(decodeScoreData(score));
      });
    });
  },

  updateScore(data) {
    return Promise.resolve(data);
  },

  removeScore(id) {
    return new Promise((resolve) => {
      realm.write(() => {
        const scores = realmScores.filtered(`id = "${id}"`);
        realm.delete(scores);
        resolve(id);
      });
    });
  },
};

module.exports = Api;

import Realm from 'realm';

import GameSchema from '../../models/GameSchema';

// Realm.clearTestState();
const realm = new Realm({ schema: [GameSchema] });

const realmGames = realm.objects('Game');

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

const Api = {
  fetchGames() {
    const games = realmGames.sorted('createdAt', true).map((game) => decodeGameData(game));
    return Promise.resolve(games);
  },

  createGame(data) {
    return new Promise((resolve) => {
      const dataEncoded = encodeGameData(data);
      const lastGames = realmGames.sorted('id', true);
      let id = '1';
      if (lastGames.length !== 0) {
        let intId = parseInt(lastGames[0].id, 10);
        intId++;
        id = intId.toString();
      }
      dataEncoded.id = id;
      realm.write(() => {
        const game = realm.create('Game', dataEncoded);
        resolve(decodeGameData(game));
      });
    });
  },

  updateGame(data) {
    return Promise.resolve(data);
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
};

module.exports = Api;

import Realm from 'realm';

import GameSchema from '../../models/GameSchema';

// Realm.clearTestState();
const realm = new Realm({ schema: [GameSchema] });

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
    const realmGames = realm.objects('Game');
    const games = realmGames.map((game) => decodeGameData(game));
    return Promise.resolve(games);
  },

  createGame(data) {
    return new Promise((resolve) => {
      const dataEncoded = encodeGameData(data);

      realm.write(() => {
        const game = realm.create('Game', dataEncoded);
        resolve(decodeGameData(game));
      });
    });
  },

  updateGame(data) {
    return Promise.resolve(data);
  },
};

module.exports = Api;

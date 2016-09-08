import Realm from 'realm';

import GameSchema from '../../models/GameSchema';

const realm = new Realm({ schema: [GameSchema] });

const Api = {
  fetchGames() {
    const games = realm.objects('Game');
    return Promise.resolve(games);
  },

  createGame(data) {
    return Promise.resolve(data);
  },

  updateGame(data) {
    return Promise.resolve(data);
  },
};

module.exports = Api;

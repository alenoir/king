let instance = {};

if (process.env.NODE_ENV !== '__TEST__') {
  instance = require('./RealmApi'); // eslint-disable-line
}

const Api = {
  /**
   * Game
   */
  fetchGames() {
    return instance.fetchGames();
  },

  createGame(data) {
    return instance.createGame(data);
  },

  updateGame(data) {
    return instance.updateGame(data);
  },

  removeGame(id) {
    return instance.removeGame(id);
  },

  /**
   * Player
   */
  fetchPlayers() {
    return instance.fetchPlayers();
  },

  createPlayer(data) {
    return instance.createPlayer(data);
  },

  updatePlayer(data) {
    return instance.updatePlayer(data);
  },

  /**
   * Score
   */
  fetchScores() {
    return instance.fetchScores();
  },

  createScore(data) {
    return instance.createScore(data);
  },

  updateScore(data) {
    return instance.updateScore(data);
  },
};

module.exports = Api;

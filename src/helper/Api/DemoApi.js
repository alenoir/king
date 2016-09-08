const DemoApi = {
  fetchGames() {
    return Promise.resolve([]);
  },

  createGame(data) {
    return Promise.resolve(data);
  },
};

module.exports = DemoApi;

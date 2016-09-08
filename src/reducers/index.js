const { combineReducers } = require('redux');
const routes = require('./routes');
const player = require('./player');

const rootReducer = combineReducers({
  routes,
  player,
});

module.exports = rootReducer;

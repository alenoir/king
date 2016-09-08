const { combineReducers } = require('redux');
const player = require('./player');

const rootReducer = combineReducers({
  player,
});

module.exports = rootReducer;

import { combineReducers } from 'redux';
import routes from './routes';
import player from './player';
import game from './game';
import score from './score';

const rootReducer = combineReducers({
  routes,
  player,
  game,
  score,
});

module.exports = rootReducer;

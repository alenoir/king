import { Record, fromJS } from 'immutable';

import {
  GAMES_RECEIVE,
  GAME_REMOVE,
} from '../constants/ActionTypes';

import GameMap from '../models/GameMap';
import Game from '../models/Game';

const InitialState = Record({
  list: new GameMap(),
});

const initialState = new InitialState();

const mergeEntities = (list, objects) => {
  return list.merge(objects.map((object) => {
    return [object.get('id'), new Game(object)];
  }));
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case GAMES_RECEIVE:
      if (!action.payload.games) { return state; }
      return state.merge({
        list: mergeEntities(state.get('list'), fromJS(action.payload.games)),
      });
    case GAME_REMOVE:
      return state.merge({
        list: state.get('list').remove(action.payload.id),
      });
    default:
      return state;
  }
};

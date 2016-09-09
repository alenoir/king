import { Record, fromJS } from 'immutable';

import {
  PLAYERS_RECEIVE,
  PLAYER_REMOVE,
} from '../constants/ActionTypes';

import PlayerMap from '../models/PlayerMap';
import Player from '../models/Player';

const InitialState = Record({
  list: new PlayerMap(),
});

const initialState = new InitialState();

const mergeEntities = (list, newPlayers) => {
  return list.merge(newPlayers.map((player) => {
    return [player.get('id'), new Player(player)];
  }));
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case PLAYERS_RECEIVE:
      if (!action.payload.players) { return state; }
      return state.merge({
        list: mergeEntities(state.get('list'), fromJS(action.payload.players)),
      });
    case PLAYER_REMOVE:
      return state.merge({
        list: state.get('list').remove(action.payload.id),
      });
    default:
      return state;
  }
};

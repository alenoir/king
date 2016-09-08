import { Record, fromJS } from 'immutable';

import {
  SCORES_RECEIVE,
  SCORE_REMOVE,
} from '../constants/ActionTypes';

import ScoreMap from '../models/ScoreMap';
import Score from '../models/Score';

const InitialState = Record({
  list: new ScoreMap(),
});

const initialState = new InitialState();

const mergeEntities = (list, objects) => {
  return list.merge(objects.map((object) => {
    return [object.get('id'), new Score(object)];
  }));
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SCORES_RECEIVE:
      if (!action.payload.scores) { return state; }
      return state.merge({
        list: mergeEntities(state.get('list'), fromJS(action.payload.scores)),
      });
    case SCORE_REMOVE:
      return state.merge({
        list: state.get('list').remove(action.payload.id),
      });
    default:
      return state;
  }
};

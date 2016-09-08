import {
  SCORES_RECEIVE,
  SCORE_REMOVE,
} from '../constants/ActionTypes';

module.exports = {
  fetch: () => {
    return (dispatch) => {
      const payload = {
        scores: [],
      };
      dispatch({ type: SCORES_RECEIVE, payload });
      return Promise.resolve();
    };
  },
  remove: (id) => {
    return (dispatch) => {
      const payload = {
        id,
      };
      dispatch({ type: SCORE_REMOVE, payload });
      return Promise.resolve();
    };
  },
};

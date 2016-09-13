import ApiHelper from '../helper/Api';
import {
  SCORES_RECEIVE,
  SCORE_REMOVE,
} from '../constants/ActionTypes';

module.exports = {
  fetch: (gameId) => {
    return (dispatch) => {
      return ApiHelper.fetchScores(gameId).then((scores) => {
        const payload = {
          scores,
        };
        dispatch({ type: SCORES_RECEIVE, payload });
      });
    };
  },
  create: (data) => {
    return (dispatch) => {
      return ApiHelper.createScore(data).then((score) => {
        const payload = {
          scores: [score],
        };
        dispatch({ type: SCORES_RECEIVE, payload });
      });
    };
  },
  update: (id, data) => {
    return (dispatch) => {
      return ApiHelper.updateScore(id, data).then((score) => {
        const payload = {
          scores: [score],
        };
        dispatch({ type: SCORES_RECEIVE, payload });
      });
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

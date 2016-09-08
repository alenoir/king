import {
  PLAYERS_RECEIVE,
  PLAYER_REMOVE,
} from '../constants/ActionTypes';

module.exports = {
  fetch: () => {
    return (dispatch) => {
      const payload = {
        players: [],
      };
      dispatch({ type: PLAYERS_RECEIVE, payload });
      return Promise.resolve();
    };
  },
  remove: (id) => {
    return (dispatch) => {
      const payload = {
        id,
      };
      dispatch({ type: PLAYER_REMOVE, payload });
      return Promise.resolve();
    };
  },
};

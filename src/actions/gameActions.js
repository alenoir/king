import {
  GAMES_RECEIVE,
  GAME_REMOVE,
} from '../constants/ActionTypes';

module.exports = {
  fetch: () => {
    return (dispatch) => {
      const payload = {
        games: [],
      };
      dispatch({ type: GAMES_RECEIVE, payload });
      return Promise.resolve();
    };
  },
  remove: (id) => {
    return (dispatch) => {
      const payload = {
        id,
      };
      dispatch({ type: GAME_REMOVE, payload });
      return Promise.resolve();
    };
  },
};

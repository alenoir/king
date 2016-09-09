import ApiHelper from '../helper/Api';
import {
  PLAYERS_RECEIVE,
  PLAYER_REMOVE,
} from '../constants/ActionTypes';

module.exports = {
  fetch: () => {
    return (dispatch) => {
      return ApiHelper.fetchPlayers().then((players) => {
        const payload = {
          players,
        };
        dispatch({ type: PLAYERS_RECEIVE, payload });
      });
    };
  },
  create: (data) => {
    return (dispatch) => {
      return ApiHelper.createPlayer(data).then((player) => {
        const payload = {
          players: [player],
        };
        dispatch({ type: PLAYERS_RECEIVE, payload });
      });
    };
  },
  update: (id, data) => {
    return (dispatch) => {
      return ApiHelper.updatePlayer(id, data).then((player) => {
        const payload = {
          players: [player],
        };
        dispatch({ type: PLAYERS_RECEIVE, payload });
      });
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

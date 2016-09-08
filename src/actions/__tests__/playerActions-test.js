import configureMockStore from 'redux-mock-store'; // eslint-disable-line
import thunk from 'redux-thunk';
import * as actions from '../playerActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Player Actions', () => {
  it('dispatch PLAYERS_RECEIVE when fetching players has been done', () => {
    const expectedActions = [
      { type: types.PLAYERS_RECEIVE, payload: { players: [] } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetch())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch PLAYER_REMOVE when remove player object', () => {
    const expectedActions = [
      { type: types.PLAYER_REMOVE, payload: { id: 'id1' } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.remove('id1'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

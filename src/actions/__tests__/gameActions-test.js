import configureMockStore from 'redux-mock-store'; // eslint-disable-line
import thunk from 'redux-thunk';
import * as actions from '../gameActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Game Actions', () => {
  it('dispatch GAMES_RECEIVE when fetching games has been done', () => {
    const expectedActions = [
      { type: types.GAMES_RECEIVE, payload: { games: [] } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetch())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch GAME_REMOVE when remove game object', () => {
    const expectedActions = [
      { type: types.GAME_REMOVE, payload: { id: 'id1' } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.remove('id1'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

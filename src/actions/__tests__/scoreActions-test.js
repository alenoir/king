import configureMockStore from 'redux-mock-store'; // eslint-disable-line
import thunk from 'redux-thunk';
import * as actions from '../scoreActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Score Actions', () => {
  it('dispatch SCORE_RECEIVE when fetching scores has been done', () => {
    const expectedActions = [
      { type: types.SCORES_RECEIVE, payload: { scores: [] } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetch())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch SCORE_REMOVE when remove score object', () => {
    const expectedActions = [
      { type: types.SCORE_REMOVE, payload: { id: 'id1' } },
    ];
    const store = mockStore({});

    return store.dispatch(actions.remove('id1'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

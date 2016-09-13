import configureMockStore from 'redux-mock-store'; // eslint-disable-line
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ApiHelper from '../../helper/Api';
import * as actions from '../gameActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Game Actions', () => {
  it('should create game', () => {
    const data = {
      id: 'id1',
      title: 'title game',
      playerIds: ['id1', 'id2'],
      winnerId: 'id1',
    };

    const expectedActions = [
      { type: types.GAMES_RECEIVE, payload: { games: [data] } },
    ];
    const stub = sinon.stub(ApiHelper, 'createGame', (createData) => {
      return Promise.resolve(createData);
    });

    const store = mockStore({});

    return store.dispatch(actions.create(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });

  it('should update game', () => {
    const data = {
      id: 'id1',
      title: 'title game updated',
      playerIds: ['id1', 'id2'],
      winnerId: 'id1',
    };

    const expectedActions = [
      { type: types.GAMES_RECEIVE, payload: { games: [data] } },
    ];
    const stub = sinon.stub(ApiHelper, 'updateGame', () => {
      return Promise.resolve(data);
    });

    const store = mockStore({});

    return store.dispatch(actions.update('id1', {}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });


  it('should fetch games', () => {
    const expectedActions = [
      { type: types.GAMES_RECEIVE, payload: { games: [] } },
    ];
    const stub = sinon.stub(ApiHelper, 'fetchGames', () => {
      return Promise.resolve([]);
    });

    const store = mockStore({});

    return store.dispatch(actions.fetch())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });

  it('sould remove game', () => {
    const id = 'id1';
    const expectedActions = [
      { type: types.GAME_REMOVE, payload: { id } },
    ];
    const stub = sinon.stub(ApiHelper, 'removeGame', (result) => {
      return Promise.resolve(result);
    });

    const store = mockStore({});

    return store.dispatch(actions.remove('id1'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });
});

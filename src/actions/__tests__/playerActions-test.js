import configureMockStore from 'redux-mock-store'; // eslint-disable-line
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ApiHelper from '../../helper/Api';
import * as actions from '../playerActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Player Actions', () => {
  it('should create player', () => {
    const data = {
      id: 'id1',
      title: 'title player',
      playerIds: ['id1', 'id2'],
      winnerId: 'id1',
    };

    const expectedActions = [
      { type: types.PLAYERS_RECEIVE, payload: { players: [data] } },
    ];
    const stub = sinon.stub(ApiHelper, 'createPlayer', (createData) => {
      return Promise.resolve(createData);
    });

    const store = mockStore({});

    return store.dispatch(actions.create(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });

  it('should update player', () => {
    const data = {
      id: 'id1',
      title: 'title player updated',
      playerIds: ['id1', 'id2'],
      winnerId: 'id1',
    };

    const expectedActions = [
      { type: types.PLAYERS_RECEIVE, payload: { players: [data] } },
    ];
    const stub = sinon.stub(ApiHelper, 'updatePlayer', () => {
      return Promise.resolve(data);
    });

    const store = mockStore({});

    return store.dispatch(actions.update('id1', {}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });


  it('should fetch players', () => {
    const expectedActions = [
      { type: types.PLAYERS_RECEIVE, payload: { players: [] } },
    ];
    const stub = sinon.stub(ApiHelper, 'fetchPlayers', () => {
      return Promise.resolve([]);
    });

    const store = mockStore({});

    return store.dispatch(actions.fetch())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });

  it('sould remove player', () => {
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

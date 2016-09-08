import configureMockStore from 'redux-mock-store'; // eslint-disable-line
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ApiHelper from '../../helper/Api';
import * as actions from '../scoreActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Score Actions', () => {
  it('should create score', () => {
    const data = {
      id: 'id1',
      title: 'title score',
      playerIds: ['id1', 'id2'],
      winnerId: 'id1',
    };

    const expectedActions = [
      { type: types.SCORES_RECEIVE, payload: { scores: [data] } },
    ];
    const stub = sinon.stub(ApiHelper, 'createScore', (createData) => {
      return Promise.resolve(createData);
    });

    const store = mockStore({});

    return store.dispatch(actions.create(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });

  it('should update score', () => {
    const data = {
      id: 'id1',
      title: 'title score updated',
      playerIds: ['id1', 'id2'],
      winnerId: 'id1',
    };

    const expectedActions = [
      { type: types.SCORES_RECEIVE, payload: { scores: [data] } },
    ];
    const stub = sinon.stub(ApiHelper, 'updateScore', () => {
      return Promise.resolve(data);
    });

    const store = mockStore({});

    return store.dispatch(actions.update('id1', {}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });


  it('should fetch scores', () => {
    const expectedActions = [
      { type: types.SCORES_RECEIVE, payload: { scores: [] } },
    ];
    const stub = sinon.stub(ApiHelper, 'fetchScores', () => {
      return Promise.resolve([]);
    });

    const store = mockStore({});

    return store.dispatch(actions.fetch())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        sinon.assert.called(stub);
      });
  });

  it('sould remove score', () => {
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

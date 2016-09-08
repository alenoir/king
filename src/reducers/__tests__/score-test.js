import ScoreMap from '../../models/ScoreMap';
import scoreReducer from '../score';
import * as types from '../../constants/ActionTypes';

let currentState;

describe('Score reducer', () => {
  it('should return the initial state', () => {
    const state = scoreReducer(currentState, {});
    expect(state.get('list')).toEqual(new ScoreMap());
  });

  it('should handle SCORES_RECEIVE', () => {
    const scores = [
      {
        id: 'id1',
        playerId: 'id1',
        value: 12,
        round: 0,
        king: false,
        createdAt: new Date(),
      },
      {
        id: 'id2',
        playerId: 'id2',
        value: 12,
        round: 0,
        king: false,
        createdAt: new Date(),
      },
    ];

    currentState = scoreReducer(currentState, {
      type: types.SCORES_RECEIVE,
      payload: {
        scores,
      },
    });

    const scoresMap = currentState.get('list');

    expect(scoresMap).not.toEqual(new ScoreMap());
    expect(scoresMap.get('id1').getId()).toEqual('id1');
    expect(scoresMap.get('id2').getId()).toEqual('id2');
  });

  it('should handle SCORES_RECEIVE with updated data', () => {
    const scores = [
      {
        id: 'id1',
        playerId: 'id3',
        value: 13,
        round: 0,
        king: false,
        createdAt: new Date(),
      },
    ];

    currentState = scoreReducer(currentState, {
      type: types.SCORES_RECEIVE,
      payload: {
        scores,
      },
    });

    const playersMap = currentState.get('list');

    expect(playersMap).not.toEqual(new ScoreMap());
    expect(playersMap.get('id1').getValue()).toEqual(13);
    expect(playersMap.get('id1').getPlayerId()).toEqual('id3');
  });

  it('should handle SCORE_REMOVE', () => {
    currentState = scoreReducer(currentState, {
      type: types.SCORE_REMOVE,
      payload: {
        id: 'id1',
      },
    });

    const scoresMap = currentState.get('list');

    expect(scoresMap.get('id1')).toBeUndefined();
  });
});

import PlayerMap from '../../models/PlayerMap';
import playerReducer from '../player';
import * as types from '../../constants/ActionTypes';

let currentState;

describe('Player reducer', () => {
  it('should return the initial state', () => {
    const state = playerReducer(currentState, {});
    expect(state.get('list')).toEqual(new PlayerMap());
  });

  it('should handle PLAYERS_RECEIVE', () => {
    const players = [
      {
        id: 'id1',
        name: 'player1',
      },
      {
        id: 'id2',
        name: 'player2',
      },
    ];

    currentState = playerReducer(currentState, {
      type: types.PLAYERS_RECEIVE,
      payload: {
        players,
      },
    });

    const playersMap = currentState.get('list');

    expect(playersMap).not.toEqual(new PlayerMap());
    expect(playersMap.get('id1').getName()).toEqual('player1');
  });

  it('should handle PLAYERS_RECEIVE with updated data', () => {
    const players = [
      {
        id: 'id1',
        name: 'player1 updated',
      },
    ];

    currentState = playerReducer(currentState, {
      type: types.PLAYERS_RECEIVE,
      payload: {
        players,
      },
    });

    const playersMap = currentState.get('list');

    expect(playersMap).not.toEqual(new PlayerMap());
    expect(playersMap.get('id1').getName()).toEqual('player1 updated');
  });

  it('should handle PLAYER_REMOVE', () => {
    currentState = playerReducer(currentState, {
      type: types.PLAYER_REMOVE,
      payload: {
        id: 'id1',
      },
    });

    const playersMap = currentState.get('list');

    expect(playersMap).not.toEqual(new PlayerMap());
    expect(playersMap.get('id1')).toBeUndefined();
  });
});

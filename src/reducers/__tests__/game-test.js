import GameMap from '../../models/GameMap';
import gameReducer from '../game';
import * as types from '../../constants/ActionTypes';

let currentState;

describe('Game reducer', () => {
  it('should return the initial state', () => {
    const state = gameReducer(currentState, {});
    expect(state.get('list')).toEqual(new GameMap());
  });

  it('should handle GAMES_RECEIVE', () => {
    const games = [
      {
        id: 'id1',
        title: 'title1',
        playerIds: ['id1', 'id2'],
        createdAt: new Date(),
        closedAt: new Date(),
        winnerId: 'id1',
      },
      {
        id: 'id2',
        title: 'title2',
        playerIds: ['id3', 'id4'],
        createdAt: new Date(),
        closedAt: new Date(),
        winnerId: 'id3',
      },
    ];

    currentState = gameReducer(currentState, {
      type: types.GAMES_RECEIVE,
      payload: {
        games,
      },
    });

    const gamesMap = currentState.get('list');

    expect(gamesMap).not.toEqual(new GameMap());
    expect(gamesMap.get('id1').getId()).toEqual('id1');
    expect(gamesMap.get('id2').getId()).toEqual('id2');
  });

  it('should handle GAME_REMOVE', () => {
    currentState = gameReducer(currentState, {
      type: types.GAME_REMOVE,
      payload: {
        id: 'id1',
      },
    });

    const gamesMap = currentState.get('list');

    expect(gamesMap.get('id1')).toBeUndefined();
  });
});

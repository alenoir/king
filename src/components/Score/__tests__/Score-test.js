import React from 'react';
import { Map, fromJS } from 'immutable';
import renderer from 'react-test-renderer'; // eslint-disable-line

import Score from '../../../models/Score';
import Game from '../../../models/Game';

import ScoreList from '../List';
import ScoreItem from '../Item';

describe('Game', () => {
  it('render List', () => {
    const gameData = {
      id: '1',
      title: 'title game',
      playerIds: fromJS(['id1', 'id2']),
      createdAt: new Date(1987, 11, 12),
      closedAt: new Date(1987, 11, 12),
      winnerId: 'id1',
    };
    const scoreData = {
      id: 'scoreId1',
      playerId: 'playerId1',
      gameId: '1',
      value: 12,
      round: 1,
    };
    const game = new Game(gameData);
    const score = new Score(scoreData);
    let rounds = new Map();
    rounds = rounds.set('0', {
      id: 0,
      scores: [score],
    });
    const props = {
      rounds,
      players: game.getPlayerIds(),
    };
    const tree = renderer.create(
      <ScoreList {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render Item', () => {
    const data = {
      id: 'scoreId1',
      playerId: 'playerId1',
      gameId: '1',
      value: 12,
      round: 1,
    };
    const score = new Score(data);

    const props = {
      gameId: '1',
      score,
    };
    const tree = renderer.create(
      <ScoreItem {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

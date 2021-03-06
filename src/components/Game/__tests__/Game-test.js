import React from 'react';
import { Map } from 'immutable';
import renderer from 'react-test-renderer'; // eslint-disable-line
// import { findAllByType } from '../../../helper/__tests__/utils/renderer-finder';

import Game from '../../../models/Game';

import GameAddButton from '../AddButton';
import GameList from '../List';
import GameItem from '../Item';

describe('Game', () => {
  it('render Button', () => {
    const props = {
      text: 'Test String',
      onPress: () => {},
      selected: false,
    };
    const tree = renderer.create(
      <GameAddButton {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render List', () => {
    const data = {
      id: 'id1',
      title: 'title game',
      playerIds: ['id1', 'id2'],
      createdAt: new Date('Feb 28 2013 19:00:00 EST'),
      closedAt: new Date('Feb 28 2013 19:00:00 EST'),
      winnerId: 'id1',
    };
    const game = new Game(data);
    let gameList = new Map();
    gameList = gameList.set('id1', game);
    const props = {
      games: gameList,
    };
    const tree = renderer.create(
      <GameList {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render Item', () => {
    const data = {
      id: 'id1',
      title: 'title game',
      playerIds: ['id1', 'id2'],
      createdAt: new Date('Feb 28 2013 19:00:00 EST'),
      closedAt: new Date('Feb 28 2013 19:00:00 EST'),
      winnerId: 'id1',
    };
    const game = new Game(data);

    const props = {
      game,
    };
    const tree = renderer.create(
      <GameItem {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

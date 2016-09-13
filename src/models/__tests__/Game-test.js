import { List } from 'immutable';
import Game from '../Game';

describe('Game model', () => {
  it('should return valid Game object', () => {
    const data = {
      id: 'id1',
      playerIds: ['id1', 'id2'],
      createdAt: new Date(),
      closedAt: new Date(),
      winnerId: 'id1',
    };
    const object = new Game(data);

    expect(object.getId()).toEqual(data.id);
    expect(object.getTitle()).toEqual(`Partie #0${data.id}`);
    expect(object.getCreatedAt()).toEqual(data.createdAt);
    expect(object.getClosedAt()).toEqual(data.closedAt);
    expect(object.getWinnerId()).toEqual(data.winnerId);
    expect(typeof object.getPlayerIds()).toEqual(typeof new List());
  });
});

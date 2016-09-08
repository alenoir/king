import Player from '../Player';

describe('Player model', () => {
  it('should return valid Player object', () => {
    const data = {
      id: 'id1',
      name: 'player1',
    };
    const object = new Player(data);
    expect(object.getId()).toEqual(data.id);
    expect(object.getName()).toEqual(data.name);
  });
});

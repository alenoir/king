import Score from '../Score';

describe('Score model', () => {
  it('should return valid Score object', () => {
    const data = {
      id: 'scoreId1',
      playerId: 'playerId1',
      value: 12,
      king: false,
      round: 1,
    };

    const object = new Score(data);
    expect(object.getId()).toEqual(data.id);
    expect(object.getPlayerId()).toEqual(data.playerId);
    expect(object.getValue()).toEqual(data.value);
    expect(object.isKing()).toEqual(data.king);
    expect(object.getRound()).toEqual(data.round);
  });
});

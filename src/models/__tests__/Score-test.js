import Score from '../Score';

describe('Score model', () => {
  it('should return valid Score object', () => {
    const data = {
      id: 'scoreId1',
      playerId: 'playerId1',
      gameId: 'gameId1',
      value: 12,
      round: 1,
    };

    const object = new Score(data);
    expect(object.getId()).toEqual(data.id);
    expect(object.getPlayerId()).toEqual(data.playerId);
    expect(object.getGameId()).toEqual(data.gameId);
    expect(object.getValue()).toEqual(data.value);
    expect(object.getRound()).toEqual(data.round);
  });
});

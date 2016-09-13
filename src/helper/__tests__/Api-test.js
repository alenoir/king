import Api from '../Api';

describe('Api', () => {
  it('should be defined', () => {
    expect(Api).toBeDefined();
  });

  it('should find "fetchGames" method', () => {
    expect(Api.fetchGames).toBeDefined();
  });

  it('should find "createGame" method', () => {
    expect(Api.createGame).toBeDefined();
  });

  it('should find "updateGame" method', () => {
    expect(Api.updateGame).toBeDefined();
  });

  it('should find "removeGame" method', () => {
    expect(Api.removeGame).toBeDefined();
  });


  it('should find "fetchPlayers" method', () => {
    expect(Api.fetchPlayers).toBeDefined();
  });

  it('should find "createPlayer" method', () => {
    expect(Api.createPlayer).toBeDefined();
  });

  it('should find "updatePlayer" method', () => {
    expect(Api.updatePlayer).toBeDefined();
  });


  it('should find "fetchScores" method', () => {
    expect(Api.fetchScores).toBeDefined();
  });

  it('should find "createScore" method', () => {
    expect(Api.createScore).toBeDefined();
  });

  it('should find "updateScore" method', () => {
    expect(Api.updateScore).toBeDefined();
  });
});

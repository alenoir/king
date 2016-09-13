import { Record } from 'immutable';

const ScoreRecord = Record({
  id: null,
  playerId: null,
  value: 0,
  round: 0,
  gameId: null,
  createdAt: null,
});

class Score extends ScoreRecord {
  getId() {
    return this.get('id');
  }

  getPlayerId() {
    return this.get('playerId');
  }

  getGameId() {
    return this.get('gameId');
  }

  getValue() {
    return this.get('value') || 0;
  }

  getRound() {
    return this.get('round') || 0;
  }
}

module.exports = Score;

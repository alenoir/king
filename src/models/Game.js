import { Record, List } from 'immutable';

const GameRecord = Record({
  id: null,
  title: null,
  playerIds: new List(),
  winnerId: null,
  createdAt: new Date(),
  closedAt: null,
});

class Game extends GameRecord {
  getId() {
    return this.get('id');
  }

  getTitle() {
    return this.get('title');
  }

  getPlayerIds() {
    return this.get('playerIds');
  }

  getWinnerId() {
    return this.get('winnerId');
  }

  getCreatedAt() {
    return this.get('createdAt');
  }

  getClosedAt() {
    return this.get('closedAt');
  }
}

module.exports = Game;

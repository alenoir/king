import { Record, List } from 'immutable';

const GameRecord = Record({
  id: null,
  title: null,
  playerIds: new List(),
  winnerId: null,
  looserId: null,
  createdAt: new Date(),
  closedAt: null,
});

const pad = (num, size) => {
  let s = `${num}`;
  while (s.length < size) s = `0${s}`;
  return s;
};

class Game extends GameRecord {
  getId() {
    return this.get('id');
  }

  getTitle() {
    return `Partie #${pad(this.get('id'), 3)}`;
  }

  getPlayerIds() {
    return this.get('playerIds');
  }

  getWinnerId() {
    return this.get('winnerId');
  }

  getLooserId() {
    return this.get('looserId');
  }

  getCreatedAt() {
    return this.get('createdAt');
  }

  getClosedAt() {
    return this.get('closedAt');
  }
}

module.exports = Game;

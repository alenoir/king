import { Record } from 'immutable';

const PlayerRecord = Record({
  id: null,
  name: null,
  picture: null,
  createdAt: null,
});

class Player extends PlayerRecord {
  getId() {
    return this.get('id');
  }

  getName() {
    return this.get('name');
  }
}

module.exports = Player;

import { Record } from 'immutable';
import ScoreMap from './ScoreMap';

const RoundRecord = Record({
  id: null,
  number: 0,
  scores: new ScoreMap(),
});

class Round extends RoundRecord {
  getId() {
    return this.get('id');
  }

  getScores() {
    return this.get('scores');
  }
}

module.exports = Round;

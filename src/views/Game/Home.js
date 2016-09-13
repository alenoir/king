import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable, { Map } from 'immutable';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

import gameActions from '../../actions/gameActions';
import scoreActions from '../../actions/scoreActions';

import ScoreList from '../../components/Score/List';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
  },
  closeButton: {
    flex: 1,
  },

  content: {
    flex: 8,
    flexDirection: 'row',
  },
  colTotal: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  colAdd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  colScore: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  playerScoreWrapper: {

  },
  playerScore: {
    color: 'white',
  },
  playerName: {
    color: 'white',
  },

  score: {
    color: 'white',
  },
});

class Feed extends Component {

  constructor(props) {
    super(props);

    const game = props.game.get('list').get(props.gameId);

    this.state = {
      game,
      scores: new Map(),
      rounds: new Map(),
      players: [],
      currentRound: 0,
    };
  }

  componentDidMount() {
    this.props.scoreActions.fetch(this.props.gameId);
    this.props.gameActions.fetch(this.props.gameId);
  }

  componentWillReceiveProps(nextProps) {
    const scoreList = nextProps.score.get('list');

    const scores = scoreList.filter((score) => {
      return score.getGameId() === this.props.gameId;
    });
    const rounds = Immutable.Map(scores.reduce((result, item) => {
      const newresult = result;
      const scoreRound = newresult[item.getRound()] || { id: item.getRound(), scores: [] };
      scoreRound.scores.push(item);
      newresult[item.getRound()] = scoreRound;
      return newresult;
    }, {}));
    const lastRound = parseInt(rounds.keySeq().max(), 10);
    const game = nextProps.game.get('list').get(nextProps.gameId);

    this.setState({
      currentRound: lastRound + 1,
      game,
      rounds,
      scores,
    });
  }

  getPlayerScore(id) {
    const total = this.state.scores.reduce((result, item) => {
      let newResult = result;
      if (id === item.getPlayerId()) {
        newResult += item.getValue();
      }
      return newResult;
    }, 0);

    return total;
  }

  handleAddScore() {
    Actions.gameScore({ gameId: this.props.gameId, round: this.state.currentRound });
  }

  handleClose() {
    Actions.pop();
  }

  renderScores(rounds, scores) {
    if (rounds && scores) {
      return (
        <View>
        { rounds.valueSeq().map((round) => {
          console.log('---- round ----', round.id);
          return (
            <View key={`round_${round.id}`}>
              { scores.valueSeq().map((score) => {
                return (
                  <View key={`score_${score.getId()}`} style={styles.playerScoreWrapper}>
                    <Text style={styles.score}>{score.getValue()}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}

        </View>
      );
    }
    return <View />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={(() => this.handleClose())}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{this.state.game.getTitle()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.colTotal}>

            {this.state.game.getPlayerIds().map((player) => {
              return (
                <View key={`total_${player}`} style={styles.playerScoreWrapper}>
                  <Text style={styles.playerScore}>{this.getPlayerScore(player)}</Text>
                  <Text style={styles.playerName}>{player}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.colAdd}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={(() => this.handleAddScore())}
            >
              <Text>Add Score</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.colScore}>
            <ScoreList rounds={this.state.rounds} />
          </View>
        </View>
      </View>
    );
  }

}

Feed.propTypes = {
  gameId: PropTypes.string.isRequired,
  score: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
  scoreActions: PropTypes.object.isRequired,
  routes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  score: state.score,
  game: state.game,
  player: state.player,
  routes: state.routes,
});
const mapDispatchToProps = (dispatch) => ({
  gameActions: bindActionCreators(gameActions, dispatch),
  scoreActions: bindActionCreators(scoreActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

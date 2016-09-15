import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable, { Map, List } from 'immutable';
import Case from 'case';
import React from 'react';
import ReactNative from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import dismissKeyboard from 'dismissKeyboard'; // eslint-disable-line

import gameActions from '../../actions/gameActions';
import scoreActions from '../../actions/scoreActions';

import ScoreList from '../../components/Score/List';
import Header from '../../components/Header';

import CloseIcon from '../../assets/images/ic_close.png';
import AddIcon from '../../assets/images/ic_add.png';
import DashedLine from '../../assets/images/dashed_line.png';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
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

  content: {
    flex: 8,
    flexDirection: 'row',
  },
  colTotal: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: 40,

  },
  colAdd: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  colScore: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 40,
  },

  addButtonWrapper: {


  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

  },

  addButtonIconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 30,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
  },

  addButtonDashWrapper: {

  },
  addButtonDash: {
    flex: 1,
    width: 10,
    flexDirection: 'column',
  },

  playerScoreWrapper: {
    marginLeft: 20,
    marginBottom: 30,
    height: 50,
  },
  playerScore: {
    fontFamily: 'Montserrat-Black',
    fontSize: 30,
    color: '#ffffff',
  },
  playerName: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#ffffff',
  },

  playerScoreWinner: {
    color: '#F8E71C',
  },
  playerNameWinner: {
    color: '#F8E71C',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    marginTop: 10,
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
      players: new List(),
      currentRound: 1,
    };
  }

  componentDidMount() {
    this.props.scoreActions.fetch(this.props.gameId);
    this.props.gameActions.fetch(this.props.gameId);
    dismissKeyboard();
  }

  componentWillReceiveProps(nextProps) {
    const scoreList = this.props.score.get('list');
    const nextScoreList = nextProps.score.get('list');

    const scores = nextScoreList.filter((score) => {
      return score.getGameId() === this.props.gameId;
    });
    const rounds = Immutable.Map(scores.reduce((result, item) => {
      const newresult = result;
      const scoreRound = newresult[item.getRound()] || { id: item.getRound(), scores: [] };
      scoreRound.scores.push(item);
      newresult[item.getRound()] = scoreRound;
      return newresult;
    }, {}));
    const lastRound = parseInt(rounds.keySeq().map((key) => parseInt(key, 10)).max(), 10) || 0;
    const game = nextProps.game.get('list').get(nextProps.gameId);
    const players = game.getPlayerIds();

    this.setState({
      currentRound: lastRound + 1,
      gameClosed: !!game.getClosedAt(),
      game,
      rounds,
      scores,
      players,
      winnerId: null,
      looserId: null,
      winnerTotal: null,
      looserTotal: null,
    });

    if (scoreList !== nextScoreList) {
      this.updateWinner(game, rounds);
    }
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

  updateWinner(game, rounds) {
    let updatedGame = game;
    let updated = false;
    let winnerId = null;
    let looserId = null;
    let winnerTotal = null;
    let looserTotal = null;
    let roundFinished = false;

    const playersScores = {};
    rounds.forEach((round) => {
      if (round.scores.length === game.getPlayerIds().count()) {
        roundFinished = true;
      } else {
        roundFinished = false;
      }
      round.scores.forEach((score) => {
        if (!playersScores[score.getPlayerId()]) {
          playersScores[score.getPlayerId()] = 0;
        }
        playersScores[score.getPlayerId()] = playersScores[score.getPlayerId()] + score.getValue();
      });
    });


    Object.keys(playersScores).forEach((key) => {
      const value = playersScores[key];
      if (winnerTotal === null || value < winnerTotal) {
        winnerId = key;
        winnerTotal = value;
      }

      if (looserTotal === null || value > looserTotal) {
        looserId = key;
        looserTotal = value;
      }
    }, null);

    console.log('--- winnerId ----', winnerId, winnerTotal);
    console.log('--- looserId ----', looserId, looserTotal);

    if (roundFinished) {
      if (looserTotal > 200 && !game.getClosedAt()) {
        updatedGame = updatedGame.set('closedAt', new Date());
        updatedGame = updatedGame.set('looserId', looserId);
        updatedGame = updatedGame.set('winnerId', winnerId);

        updated = true;

        Alert.alert(
          'Partie terminée',
          `Bravo à ${winnerId} qui a gagné la partie avec un score de ${winnerTotal} !`,
          [
            { text: 'OK' },
          ]
        );
      }
    }

    if (updated) {
      this.props.gameActions.update(updatedGame.toJS());
    }
  }

  handleAddScore() {
    if (!this.state.game.getClosedAt()) {
      Actions.gameScore({ gameId: this.props.gameId, round: this.state.currentRound });
    }
  }

  handleClose() {
    Actions.feed({ type: ActionConst.RESET });
  }

  handleEditScore(round) {
    Actions.gameScore({ gameId: this.props.gameId, round: round.id, scores: round.scores });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.game.getTitle()}
          onLeftButtonPress={(() => this.handleClose())}
          buttonLeftImage={CloseIcon}
        />
        <View style={styles.content}>
          <View style={styles.colTotal}>

            {this.state.players.map((player) => {
              const playerNameStyles = [styles.playerName];
              const playerScoreStyles = [styles.playerScore];
              if (this.state.game.getClosedAt() && player === this.state.game.getWinnerId()) {
                playerNameStyles.push(styles.playerNameWinner);
                playerScoreStyles.push(styles.playerScoreWinner);
              }

              return (
                <View key={`total_${player}`} style={styles.playerScoreWrapper}>
                  <Text
                    style={playerScoreStyles}
                    numberOfLines={1}
                  >
                    {this.getPlayerScore(player)}
                  </Text>
                  <Text style={playerNameStyles}>{Case.title(player)}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.colAdd}>
            <View style={styles.addButtonWrapper}>
              {(() => {
                if (!this.state.game.getClosedAt()) {
                  return (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={(() => this.handleAddScore())}
                    >
                      <View style={styles.addButtonIconWrapper}>
                        <Image
                          style={styles.addButtonIcon}
                          source={AddIcon}
                        />
                      </View>

                    </TouchableOpacity>
                  );
                }
                return false;
              })()}
            </View>

            <View style={styles.addButtonDashWrapper}>
              <Image
                style={styles.backgroundImage}
                source={DashedLine}
              />
            </View>
          </View>
          <View style={styles.colScore}>
            <ScoreList
              players={this.state.players}
              rounds={this.state.rounds}
              handleRoundLongPress={(round) => this.handleEditScore(round)}
            />
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

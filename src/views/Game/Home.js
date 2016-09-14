import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable, { Map, List } from 'immutable';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

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
    justifyContent: 'center',
    flexDirection: 'column',
  },
  colScore: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 40,
  },

  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  addButtonIconWrapper: {
    flex: 1,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
  },
  addButtonDashWrapper: {
    flex: 10,
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
    const lastRound = parseInt(rounds.keySeq().map((key) => parseInt(key, 10)).max(), 10) || 0;
    const game = nextProps.game.get('list').get(nextProps.gameId);
    const players = game.getPlayerIds();
    this.setState({
      currentRound: lastRound + 1,
      game,
      rounds,
      scores,
      players,
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
              return (
                <View key={`total_${player}`} style={styles.playerScoreWrapper}>
                  <Text
                    style={styles.playerScore}
                    numberOfLines={1}
                  >
                    {this.getPlayerScore(player)}
                  </Text>
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
              <View style={styles.addButtonIconWrapper}>
                <Image
                  style={styles.addButtonIcon}
                  source={AddIcon}
                />
              </View>
              <View style={styles.addButtonDashWrapper} />
            </TouchableOpacity>
            <Image
              style={styles.backgroundImage}
              source={DashedLine}
            />
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

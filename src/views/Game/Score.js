import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';
import isNumber from 'is-number';

import ParticipantChoice from '../../components/Participant/Choice';
import gameActions from '../../actions/gameActions';
import scoreActions from '../../actions/scoreActions';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DB0CD',
  },
  input: {
    flex: 10,
    backgroundColor: '#FF0000',
    textAlign: 'center',
  },
  player: {
    fontFamily: 'Montserrat-Light',
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    flex: 1,
  },
  addButtonText: {
    fontFamily: 'Montserrat-Light',
    textAlign: 'center',
  },
});

class GameScore extends Component {

  constructor(props) {
    super(props);

    const gameObject = props.game.get('list').get(props.gameId);
    const players = gameObject.getPlayerIds();

    const playerScores = players.map((player) => {
      return {
        name: player,
        score: 0,
      };
    });

    this.state = {
      players: playerScores,
      game: gameObject,
      currentPlayer: playerScores.first(),
      currentIndex: 0,
    };
  }

  componentDidMount() {
  }

  handleOnChange(text) {
    const intValue = parseInt(text, 10);
    if (isNumber(intValue)) {
      const currentPlayer = this.state.currentPlayer;
      currentPlayer.score = intValue;
      this.setState({
        currentPlayer,
      });
    }
  }

  handleAddScore() {
    const scoreObject = {
      playerId: this.state.currentPlayer.name,
      value: this.state.currentPlayer.score,
      round: this.props.round,
      gameId: this.props.gameId,
      id: new Date().getTime().toString(),
    };
    console.log(scoreObject);
    this.props.scoreActions.create(scoreObject);
    const nextIndex = this.state.currentIndex + 1;
    if (nextIndex >= this.state.players.count()) {
      Actions.pop();
    } else {
      this.setState({
        currentIndex: nextIndex,
        currentPlayer: this.state.players.get(nextIndex),
      });
    }
  }

  render() {
    console.log(this.props.round);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.handleOnChange(text)}
          value={this.state.currentPlayer.score.toString()}
          autoFocus
        />
        <Text style={styles.player}>{this.state.currentPlayer.name}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={(() => this.handleAddScore())}
        >
          <Text style={styles.addButtonText}>Add Score</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

GameScore.propTypes = {
  round: PropTypes.number.isRequired,
  gameId: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(GameScore);

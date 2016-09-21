import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';
import isNumber from 'is-number';

import scoreActions from '../../actions/scoreActions';

import Header from '../../components/Header';

import CloseIcon from '../../assets/images/ic_close.png';
import NextIcon from '../../assets/images/ic_next.png';


const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scoreContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  scoreContent: {
    marginTop: -70,
  },
  score: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 150,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  player: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  input: {
    opacity: 0,
    height: 0,
  },

  addButton: {
    height: 50,
    backgroundColor: '#F8E71C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonBefore: {
    flex: 1,
  },
  addButtonText: {
    flex: 8,
    fontFamily: 'Montserrat-Black',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#000000',
  },
  addButtonIconWrapper: {
    flex: 1,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
  },
});

class GameScore extends Component {

  constructor(props) {
    super(props);

    const game = props.game.get('list').get(props.gameId);
    const players = game.getPlayerIds();

    const playerScores = players.map((player) => {
      let value = 0;
      let score = null;
      if (this.props.scores) {
        const filteredCores = this.props.scores.filter((item) => {
          return item.getPlayerId() === player;
        });
        score = filteredCores[0];
        if (score) {
          value = score.getValue() || 0;
        }
      }
      return {
        name: player,
        score: value,
        defaultScore: score,
      };
    });
    const currentPlayer = playerScores.first();

    this.state = {
      players: playerScores,
      game,
      currentPlayer,
      currentIndex: 0,
      buttonText: 'JOUEUR SUIVANT',
      title: game.getTitle(),
    };
  }

  handleOnChange(text) {
    let intValue = parseInt(text, 10);
    if (!text) {
      intValue = 0;
    }
    if (isNumber(intValue)) {
      const currentPlayer = this.state.currentPlayer;
      currentPlayer.score = intValue;
      this.setState({
        currentPlayer,
      });
    }
  }

  handleAddScore() {
    let id = new Date().getTime().toString();
    if (this.state.currentPlayer.defaultScore) {
      id = this.state.currentPlayer.defaultScore.getId();
    }
    const scoreObject = {
      playerId: this.state.currentPlayer.name,
      value: this.state.currentPlayer.score,
      round: this.props.round,
      gameId: this.props.gameId,
      id,
    };
    this.props.scoreActions.create(scoreObject);
    const nextIndex = this.state.currentIndex + 1;
    if (nextIndex >= this.state.players.count()) {
      Actions.pop();
    } else {
      let buttonText = this.state.buttonText;
      if (nextIndex === this.state.players.count() - 1) {
        buttonText = 'TERMINÉ';
      }
      this.setState({
        buttonText,
        currentIndex: nextIndex,
        currentPlayer: this.state.players.get(nextIndex),
      });
    }
  }

  handleClose() {
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.title}
          onLeftButtonPress={(() => this.handleClose())}
          buttonLeftImage={CloseIcon}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.handleOnChange(text)}
          value={this.state.currentPlayer.score.toString()}
          autoFocus
          autoCorrect={false}
          keyboardType={'numeric'}
          keyboardAppearance={'dark'}
        />
        <View style={styles.scoreContainer}>
          <View style={styles.scoreContent}>
            <Text style={styles.score}>{this.state.currentPlayer.score}</Text>
            <Text style={styles.player}>{this.state.currentPlayer.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={(() => this.handleAddScore())}
        >
          <View style={styles.addButtonBefore} />
          <Text style={styles.addButtonText}>{this.state.buttonText}</Text>
          <View style={styles.addButtonIconWrapper} >
            <Image
              style={styles.addButtonIcon}
              source={NextIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

GameScore.propTypes = {
  scores: PropTypes.array,
  round: PropTypes.number.isRequired,
  gameId: PropTypes.string.isRequired,
  game: PropTypes.object.isRequired,
  scoreActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  score: state.score,
  game: state.game,
});
const mapDispatchToProps = dispatch => ({
  scoreActions: bindActionCreators(scoreActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScore);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

import ParticipantChoice from '../../components/Participant/Choice';
import gameActions from '../../actions/gameActions';

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
});

class Feed extends Component {

  constructor() {
    super();

    this.state = {
      players: [],
    };
  }

  componentDidMount() {

  }

  getPlayerScore(id) {
    return 10;
  }

  handleAddScore() {
    Actions.gameScore({ gameId: this.props.gameId });
  }

  handleClose() {
    Actions.pop();
  }


  render() {
    const { game, gameId } = this.props;
    console.log('------- gameId -------', gameId, game.get('list'));

    const gameObject = game.get('list').get(gameId);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={(() => this.handleClose())}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{gameObject.getTitle()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.colTotal}>

            {gameObject.getPlayerIds().map((player) => {
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
          <View style={styles.colScore} />

        </View>
      </View>
    );
  }

}

Feed.propTypes = {
  gameId: PropTypes.string.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
  routes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  game: state.game,
  player: state.player,
  routes: state.routes,
});
const mapDispatchToProps = (dispatch) => ({
  gameActions: bindActionCreators(gameActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

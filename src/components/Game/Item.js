import React from 'react';
import ReactNative from 'react-native';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
    marginTop: 15,
    marginBottom: 15,
    height: 40,
  },
  titleWrapper: {
    flex: 1,

  },
  title: {
    fontFamily: 'Montserrat-Light',
    fontSize: 19,
    color: '#ffffff',
  },

  subTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  winner: {
    fontFamily: 'Montserrat-Light',
    color: '#ffffff',
  },
  looser: {
    fontFamily: 'Montserrat-Light',
    color: '#ffffff',
  },
});
const ACTION_TIMER = 400;

class GameList extends Component {

  constructor() {
    super();

    this.state = {
      pressAction: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.progressValue = 0;
    this.state.pressAction.addListener((v) => { this.progressValue = v.value; });
  }

  handlePressIn() {
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
    }).start(() => this.animationActionComplete());
  }

  handlePressOut() {
    if (this.progressValue < 1) {
      this.props.onSelect(this.props.game.getId());
    }
    Animated.timing(this.state.pressAction, {
      duration: 0,
      toValue: 0,
    }).start();
  }

  animationActionComplete() {
    if (this.progressValue === 1) {
      this.props.onLongPress(this.props.game.getId());
    }
  }

  renderPlayers() {
    const { game } = this.props;

    if (game.getWinnerId()) {
      return (
        <View style={styles.subTitleWrapper}>
          <View style={styles.winnerWrappr}>
            <Text style={styles.winner}>{game.getWinnerId()}</Text>
          </View>
          <View style={styles.looserWrapper}>
            <Text style={styles.looser}>{game.getLooserId()}</Text>
          </View>
        </View>
      );
    }
    return false;
  }

  render() {
    const { game } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPressIn={() => this.handlePressIn()}
          onPressOut={() => this.handlePressOut()}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{game.getTitle()}</Text>
          </View>

          {this.renderPlayers()}
        </TouchableOpacity>
      </View>
    );
  }

}

//

GameList.propTypes = {
  game: PropTypes.object,
  onSelect: PropTypes.func,
  onLongPress: PropTypes.func,
};

module.exports = GameList;

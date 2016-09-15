import React from 'react';
import ReactNative from 'react-native';
import Case from 'case';

import WinnerIcon from '../../assets/images/ic_winner.png';
import LooserIcon from '../../assets/images/ic_looser.png';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 30,
  },

  button: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  titleWrapper: {

  },
  title: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
    fontSize: 19,
    color: '#ffffff',
    marginBottom: 5,
  },

  subTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  userWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 13,
  },
  user: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    marginLeft: 4,
  },
  winner: {
    color: '#F8E71C',
  },
  looser: {
    color: '#9B9B9B',
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

  handlePress() {
    this.props.onSelect(this.props.game.getId());
  }

  handleLongPress() {
    this.props.onLongPress(this.props.game.getId());
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
          <View style={styles.userWrapper}>
            <Image
              style={[styles.winnerIcon, styles.icon]}
              source={WinnerIcon}
            />
            <Text style={[styles.winner, styles.user]}>{Case.title(game.getWinnerId())}</Text>
          </View>
          <View style={styles.userWrapper}>
            <Image
              style={[styles.looserIcon, styles.icon]}
              source={LooserIcon}
            />
            <Text style={[styles.looser, styles.user]}>{Case.title(game.getLooserId())}</Text>
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
          testID={'game_item_button'}
          style={styles.button}
          onPress={() => this.handlePress()}
          onLongPress={() => this.handleLongPress()}
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

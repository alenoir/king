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
  },
  title: {
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

  render() {
    const { game } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPressIn={() => this.handlePressIn()}
          onPressOut={() => this.handlePressOut()}
        >
          <Text style={styles.title}>{game.getPlayerIds()}</Text>
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

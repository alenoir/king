import React from 'react';
import ReactNative from 'react-native';

const {
  StyleSheet,
  View,
  Text,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    opacity: 0.5,
  },

  scoreWinner: {
    color: '#F8E71C',
    opacity: 1,
  },
});

class GameItem extends Component {

  render() {
    const { score } = this.props;
    const stylesScore = [styles.score];
    if (score.getValue() === 0) {
      stylesScore.push(styles.scoreWinner);
    }
    return (
      <View
        style={styles.container}
      >
        <Text style={stylesScore}>{score.getValue()}</Text>
      </View>
    );
  }

}

//

GameItem.propTypes = {
  score: PropTypes.object,
};

module.exports = GameItem;

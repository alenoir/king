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
    width: 50,
    height: 50,
  },
  score: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

class GameList extends Component {

  constructor() {
    super();
  }


  render() {
    const { score, roundId } = this.props;
    return (
      <View
        style={styles.container}
        key={`round_${roundId}_score_${score.getId()}`}
        style={styles.playerScoreWrapper}
      >
        <Text style={styles.score}>{score.getValue()}</Text>
      </View>
    );
  }

}

//

GameList.propTypes = {
  roundId: PropTypes.number,
  score: PropTypes.object,
};

module.exports = GameList;

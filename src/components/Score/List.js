import React from 'react';
import ReactNative from 'react-native';

import ScoreItem from './Item';

const {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  scrollviewWrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  roundContainer: {
    width: 50,
  },
  roundTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
  },

  scoreContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});

const ACTION_TIMER = 400;

class ScoreList extends Component {
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

  handlePressIn(round) {
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
    }).start(() => this.animationActionComplete(round));
  }

  handlePressOut() {
    Animated.timing(this.state.pressAction, {
      duration: 0,
      toValue: 0,
    }).start();
  }

  animationActionComplete(round) {
    if (this.progressValue === 1) {
      this.props.handleRoundLongPress(round);
    }
  }

  render() {
    const { rounds, players } = this.props;
    const sortedRounds = rounds.sort(
      (a, b) => {
        return parseInt(a.id, 10) > parseInt(b.id, 10);
      }
    ).reverse();
    return (
      <View style={styles.scrollviewWrapper}>
        <ScrollView horizontal>
          <View style={styles.container}>
            { sortedRounds.valueSeq().map((round) => {
              return (
                <View style={styles.roundContainer} key={`round_${round.id}`}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPressIn={() => this.handlePressIn(round)}
                    onPressOut={() => this.handlePressOut()}
                  >
                    <View style={styles.scoreContainer}>
                      { players.map((player, key) => {
                        const score = round.scores.filter((item) => {
                          return item.getPlayerId() === player;
                        })[0];

                        if (score) {
                          return (
                            <ScoreItem
                              score={score}
                              key={`score_${score.getId()}`}
                            />
                          );
                        }
                        return <View key={`score_empty_${key}`} />;
                      })}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

}

ScoreList.propTypes = {
  style: PropTypes.number,
  rounds: PropTypes.object,
  players: PropTypes.object,
  handleRoundLongPress: PropTypes.func,
};

module.exports = ScoreList;

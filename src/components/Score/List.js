import React from 'react';
import ReactNative from 'react-native';

import ScoreItem from './Item';

const {
  StyleSheet,
  View,
  ScrollView,
  Text,
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

  },
});

class ScoreList extends Component {
  render() {
    const { rounds, players } = this.props;
    const sortedRounds = rounds.sort(
      (a, b) => a.id < b.id
    );
    return (
      <View style={styles.scrollviewWrapper}>
        <ScrollView horizontal>
          <View style={styles.container}>
            { sortedRounds.valueSeq().map((round) => {
              return (
                <View style={styles.roundContainer} key={`round_${round.id}`}>
                  <Text style={styles.roundTitle}>
                    {round.id}
                  </Text>
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
};

module.exports = ScoreList;

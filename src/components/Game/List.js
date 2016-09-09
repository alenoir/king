import React from 'react';
import ReactNative from 'react-native';

import GameItem from './Item';

const {
  StyleSheet,
  View,
  ScrollView,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {

  },

});

class GameList extends Component {
  render() {
    const { games } = this.props;
    return (
      <View style={this.props.style}>
        <ScrollView style={styles.container}>
          {games.valueSeq().map((game) => {
            return (
              <GameItem key={game.getId()} game={game} />
            );
          })}
        </ScrollView>
      </View>

    );
  }

}

GameList.propTypes = {
  style: PropTypes.number,
  games: PropTypes.object,
  players: PropTypes.object,
};

module.exports = GameList;

import {
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';

import React, {
  Component,
} from 'react';

import Feed from '../views/Feed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DB0CD',
  },
});

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <Feed />
      </View>
    );
  }
}

module.exports = App;

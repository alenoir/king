/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const { Provider } = require('react-redux');
const configureStore = require('./src/store/configureStore');

const store = configureStore();

class king extends Component {
  render() {
    return (
      <Provider store={store}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('king', () => king);

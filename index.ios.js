import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/layout/App';

const { Provider } = require('react-redux');
const configureStore = require('./src/store/configureStore');

const store = configureStore();

class king extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('king', () => king);

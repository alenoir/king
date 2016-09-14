import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/containers/App';

class king extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('king', () => king);

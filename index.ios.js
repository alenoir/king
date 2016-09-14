import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/containers/App';

class king extends Component {
  render() {
    return (
      <App style={{ backgroundColor: '#000000' }} />
    );
  }
}

AppRegistry.registerComponent('king', () => king);

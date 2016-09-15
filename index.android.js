import React, { Component } from 'react';
import RatingRequestor from 'react-native-rating-requestor';

import {
  AppRegistry,
} from 'react-native';

import App from './src/containers/App';

global.RatingTracker = new RatingRequestor('com.coverage.king');

class king extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('king', () => king);

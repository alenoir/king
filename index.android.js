import React, { Component } from 'react';
import RatingRequestor from 'react-native-rating-requestor';

import {
  AppRegistry,
} from 'react-native';

import App from './src/containers/App';

global.RatingTracker = new RatingRequestor('com.coverage.king', {
  title: 'Tu aimes KING! ?',
  message: 'Entre deux partis de KING! viens noter l\'application !',
  actionLabels: {
    decline: 'Non merci...',
    delay: 'Une prochaine fois',
    accept: 'Avec plaisir !',
  },
});

class king extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('king', () => king);

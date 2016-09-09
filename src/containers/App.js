import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Routes from '../routes';

const store = configureStore();


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

module.exports = App;

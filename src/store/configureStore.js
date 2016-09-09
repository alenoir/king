import { Platform } from 'react-native';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import rootReducer from '../reducers';

module.exports = (initialState) => {
  const loggerMiddleware = createLogger();

  let enhancer;

  if (global.__DEV__) { // eslint-disable-line
    enhancer = compose(
      applyMiddleware(
        ReduxThunk,
        loggerMiddleware
      ),
      devTools({
        name: Platform.OS,
        hostname: '192.168.1.21',
        port: 5678,
      })
    );
  } else {
    enhancer = compose(
      applyMiddleware(
        ReduxThunk
      )
    );
  }

  const store = createStore(rootReducer, initialState, enhancer);

  if (global.__DEV__) {// eslint-disable-line
    devTools.updateStore(store);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers'); // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

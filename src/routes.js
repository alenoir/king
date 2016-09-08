import { Scene, Actions, Router, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import React from 'react';

import Feed from './views/Feed';

const {
  Component,
  PropTypes,
} = React;

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="feed" component={Feed} title="Feed" initial />
  </Scene>
);

class Routes extends Component {
  constructor() {
    super();

    this.reducerCreate = this.reducerCreate.bind(this);
  }
  reducerCreate(params) {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  }

  render() {
    return (
      <Router
        createReducer={this.reducerCreate}
        scenes={scenes}
      />
    );
  }
}

Routes.propTypes = {
  dispatch: PropTypes.func,
};

module.exports = connect()(Routes);

import { Scene, Actions, Router, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import React from 'react';

import Feed from './views/Feed';
import GameNew from './views/Game/New';
import GameHome from './views/Game/Home';
import GameScore from './views/Game/Score';

const {
  Component,
  PropTypes,
} = React;

const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="feed" component={Feed} title="Feed" initial />
    <Scene key="gameNew" direction="vertical" component={GameNew} title="New Game" />
    <Scene key="gameHome" direction="vertical" component={GameHome} title="Game" />
    <Scene key="gameScore" direction="vertical" component={GameScore} title="Game Score" />
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

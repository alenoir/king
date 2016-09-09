import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const {
  Component,
  PropTypes,
} = React;

import GameAddButton from '../components/Game/AddButton';
import gameActions from '../actions/gameActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DB0CD',
  },
});

class Feed extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.gameActions.fetch();
  }


  render() {
    console.log('---', this.props.routes);
    return (
      <View style={styles.container}>
        <GameAddButton />
        <Text>
          The current scene is titled {this.props.routes.scene.title}.
        </Text>
      </View>
    );
  }

}

Feed.propTypes = {
  game: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
  routes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  game: state.game,
  routes: state.routes,
});
const mapDispatchToProps = (dispatch) => ({
  gameActions: bindActionCreators(gameActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Feed);

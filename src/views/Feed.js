import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  StyleSheet,
  View,
} from 'react-native';

import React, {
  Component,
  PropTypes,
} from 'react';

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
    return (
      <View style={styles.container} />
    );
  }

}

Feed.propTypes = {
  game: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});
const mapDispatchToProps = (dispatch) => ({
  gameActions: bindActionCreators(gameActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Feed);

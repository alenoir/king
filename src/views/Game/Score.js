import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

import ParticipantChoice from '../../components/Participant/Choice';
import gameActions from '../../actions/gameActions';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DB0CD',
  },
  finishButton: {
    flex: 1,
  },
});

class GameScore extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }

}

GameScore.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
  routes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  game: state.game,
  player: state.player,
  routes: state.routes,
});
const mapDispatchToProps = (dispatch) => ({
  gameActions: bindActionCreators(gameActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScore);

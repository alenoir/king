import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

import GameAddButton from '../components/Game/AddButton';
import gameActions from '../actions/gameActions';

const {
  StyleSheet,
  View,
  Text,
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

  handleAddGame() {
    Actions.gameNew();
  }

  render() {
    return (
      <View style={styles.container}>
        <GameAddButton text="Add" onPress={(() => this.handleAddGame())} />
        <Text>
          The current scene is titled {this.props.routes.get('scene').get('title')}.
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

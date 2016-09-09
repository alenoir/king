import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

import GameAddButton from '../components/Game/AddButton';
import GameList from '../components/Game/List';
import gameActions from '../actions/gameActions';

const {
  StyleSheet,
  View,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    flex: 1,
  },
  list: {
    flex: 6,
  },
});

class Feed extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.gameActions.fetch().then(() => {
      // Actions.gameHome({ gameId: '1473434578909' });
    });
  }

  handleAddGame() {
    Actions.gameNew();
  }

  render() {
    const { game } = this.props;

    return (
      <View style={styles.container}>
        <GameAddButton style={styles.button} text="Add" onPress={(() => this.handleAddGame())} />
        <GameList style={styles.list} games={game.get('list')} />
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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

import gameActions from '../actions/gameActions';

import GameList from '../components/Game/List';
import Header from '../components/Header';

import AddIcon from '../assets/images/ic_add.png';

const {
  StyleSheet,
  View,
  Alert,
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
    this.props.gameActions.fetch();
    RatingTracker.handlePositiveEvent();
  }

  handleAddGame() {
    Actions.gameNew();
  }

  handleItemSelected(id) {
    Actions.gameHome({ gameId: id });
  }

  handleRemoveItem(id) {
    this.props.gameActions.remove(id);
  }

  handleItemLongPress(id) {
    Alert.alert(
      'Warnig',
      'Delete this game ?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => this.handleRemoveItem(id) },
      ]
    );
  }

  render() {
    const { game } = this.props;

    return (
      <View style={styles.container}>
        <Header
          title={'KING!'}
          onRightButtonPress={(() => this.handleAddGame())}
          buttonRightImage={AddIcon}
          big
        />
        <GameList
          onItemLongPress={id => this.handleItemLongPress(id)}
          onItemSelected={id => this.handleItemSelected(id)}
          style={styles.list}
          games={game.get('list')}
        />
      </View>
    );
  }

}

Feed.propTypes = {
  game: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  game: state.game,
});
const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(gameActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';

import ParticipantChoice from '../../components/Participant/Choice';
import gameActions from '../../actions/gameActions';

import Header from '../../components/Header';

import CloseIcon from '../../assets/images/ic_close.png';
import NextIcon from '../../assets/images/ic_next.png';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  addButton: {
    height: 50,
    backgroundColor: '#F8E71C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonBefore: {
    flex: 1,
  },
  addButtonText: {
    flex: 8,
    fontFamily: 'Montserrat-Black',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#000000',
  },
  addButtonIconWrapper: {
    flex: 1,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
  },
});

class Feed extends Component {

  constructor() {
    super();
    this.state = {
      selectedPlayers: [],
      buttonText: 'CRÉER LA PARTIE',
    };
  }

  componentDidMount() {
  }

  handlePlayersChange(players) {
    this.setState({
      selectedPlayers: players,
    });
  }

  handleNext() {
    const game = {
      id: new Date().getTime().toString(),
      title: '',
      playerIds: this.state.selectedPlayers,
    };
    this.props.gameActions.create(game).then(() => {
      Actions.gameHome({ gameId: game.id });
    });
  }

  handleClose() {
    Actions.pop();
  }

  render() {
    const { player } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title={'Nouvelle partie'}
          onLeftButtonPress={(() => this.handleClose())}
          buttonLeftImage={CloseIcon}
        />
        <ParticipantChoice
          players={player.get('list')}
          onChange={((ids) => this.handlePlayersChange(ids))}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={(() => this.handleNext())}
        >
          <View style={styles.addButtonBefore} />
          <Text style={styles.addButtonText}>{this.state.buttonText}</Text>
          <View style={styles.addButtonIconWrapper} >
            <Image
              style={styles.addButtonIcon}
              source={NextIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

Feed.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

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
  },

  addButton: {
    height: 50,
    backgroundColor: '#F8E71C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.3,
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
      valid: false,
    };
  }

  componentDidMount() {
  }

  handlePlayersChange(players) {
    let newButtonText = 'CRÉER LA PARTIE';
    if (players.length > 1) {
      newButtonText = 'CRÉER LA PARTIE';
    }
    this.setState({
      selectedPlayers: players,
      buttonText: newButtonText,
      valid: players.length > 1,
    });
  }

  handleNext() {
    if (this.state.selectedPlayers.length > 1) {
      const game = {
        id: new Date().getTime().toString(),
        title: '',
        playerIds: this.state.selectedPlayers,
      };
      this.props.gameActions.create(game).then(() => {
        Actions.gameHome({ gameId: game.id });
      });
    }
  }

  handleClose() {
    Actions.pop();
  }

  render() {
    const { player } = this.props;
    const styleButton = [styles.addButton];
    if (!this.state.valid) {
      styleButton.push(styles.addButtonDisabled);
    }

    return (
      <View style={styles.container}>
        <Header
          title={'Nouvelle partie'}
          onLeftButtonPress={(() => this.handleClose())}
          buttonLeftImage={CloseIcon}
        />
        <ParticipantChoice
          players={player.get('list')}
          onChange={(ids => this.handlePlayersChange(ids))}
          onFinsh={(() => this.handleNext())}
        />

        <TouchableOpacity

          onPress={(() => this.handleNext())}
          disabled={!this.state.valid}
        >
          <View style={styleButton}>
            <View style={styles.addButtonBefore} />
            <Text style={styles.addButtonText}>{this.state.buttonText}</Text>
            <View style={styles.addButtonIconWrapper} >
              <Image
                style={styles.addButtonIcon}
                source={NextIcon}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

Feed.propTypes = {
  player: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  player: state.player,
});
const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(gameActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

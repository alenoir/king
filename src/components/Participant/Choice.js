import ReactNative from 'react-native';
import React from 'react';

import CloseIcon from '../../assets/images/ic_close.png';
import AddIcon from '../../assets/images/ic_add.png';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  itemChoice: {
    flexDirection: 'row',
    height: 26,
    borderRadius: 13,
    marginLeft: 6,
    marginBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  itemChoiceText: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#ffffff',
  },
  itemChoiceButton: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  itemChoiceButtonIcon: {
    height: 15,
    width: 15,
  },
  inputWrapper: {
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 26,
    marginLeft: 6,
  },
  input: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#ffffff',
    height: 26,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    minWidth: 100,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  addButton: {
    height: 26,
    width: 30,
    marginLeft: 5,
    justifyContent: 'center',
  },
  addButtonIcon: {
    height: 20,
    width: 20,
  },

});

const defaultState = {
  currentInputText: '',
  selectedPlayers: [],
  inputWidth: 10,
};

class ParticipantChoice extends Component {
  constructor() {
    super();

    this.input = null;
    this.state = defaultState;
  }

  handleAddPlayer() {
    const selectedPlayers = this.state.selectedPlayers;
    const newPlayer = this.state.currentInputText;
    if (newPlayer !== '' && selectedPlayers.indexOf(newPlayer) < 0) {
      selectedPlayers.push(newPlayer);

      this.props.onChange(selectedPlayers);

      this.setState({
        inputWidth: defaultState.inputWidth,
        currentInputText: '',
        selectedPlayers,
      });
    }
    this.input.focus();
  }

  handleRemovePlayer(name) {
    const selectedPlayers = this.state.selectedPlayers;
    const index = selectedPlayers.indexOf(name);

    selectedPlayers.splice(index, 1);

    this.props.onChange(selectedPlayers);

    this.setState({
      inputWidth: defaultState.inputWidth,
      currentInputText: '',
      selectedPlayers,
    });
    this.input.focus();
  }

  handleInputChange(text) {
    this.setState({
      inputWidth: (8 * text.length),
      currentInputText: text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {this.state.selectedPlayers.map((player) => {
            return (
              <View key={`player_${player}`} style={styles.itemChoice}>
                <Text style={styles.itemChoiceText}>{player}</Text>
                <TouchableOpacity
                  style={styles.itemChoiceButton}
                  onPress={(() => this.handleRemovePlayer(player))}
                >
                  <Image
                    style={styles.itemChoiceButtonIcon}
                    source={CloseIcon}
                  />
                </TouchableOpacity>

              </View>
            );
          })}

          <View style={styles.inputWrapper}>
            <TextInput
              ref={((c) => { this.input = c; })}
              style={[styles.input, { width: this.state.inputWidth }]}
              onChangeText={(text) => this.handleInputChange(text)}
              value={this.state.currentInputText}
              onSubmitEditing={(() => this.handleAddPlayer())}
              autoFocus
              returnKeyType="next"
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={(() => this.handleAddPlayer())}
          >
            <Image
              style={styles.addButtonIcon}
              source={AddIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

ParticipantChoice.propTypes = {
  onChange: PropTypes.func,
  players: PropTypes.object,
};

export default ParticipantChoice;

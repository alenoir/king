import ReactNative from 'react-native';
import React from 'react';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  itemChoice: {
    backgroundColor: '#222222',
    height: 40,
  },
  itemChoiceText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  itemChoiceButton: {
    backgroundColor: '#ff0000',
    height: 20,
    width: 20,
  },
  input: {
    fontSize: 14,
    color: '#0000ff',
    backgroundColor: '#ff5555',
    height: 40,
    minWidth: 60,
  },
  addButton: {
    backgroundColor: '#543212',
    height: 40,
    width: 40,
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
      inputWidth: 30 + (8 * text.length),
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
                  <Text>X</Text>
                </TouchableOpacity>

              </View>
            );
          })}

          <TextInput
            ref={((c) => { this.input = c; })}
            style={[styles.input, { width: this.state.inputWidth }]}
            onChangeText={(text) => this.handleInputChange(text)}
            value={this.state.currentInputText}
            onSubmitEditing={(() => this.handleAddPlayer())}
            autoFocus
            returnKeyType="next"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={(() => this.handleAddPlayer())}
          >
            <Text>Add</Text>
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

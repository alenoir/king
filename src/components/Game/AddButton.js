import ReactNative from 'react-native';
import React from 'react';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#2DB0CD',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});

class AddButton extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.onPress}
        >
          <View style={styles.content}>
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

AddButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};

module.exports = AddButton;

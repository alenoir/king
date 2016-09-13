import React from 'react';
import ReactNative from 'react-native';

const {
  StyleSheet,
  View,
  Text,
} = ReactNative;

const {
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
  },

});

class GameHome extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ok</Text>
      </View>
    );
  }

}

GameHome.propTypes = {
};

export default GameHome;

import React from 'react';
import ReactNative from 'react-native';

const {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} = ReactNative;

const {
  PropTypes,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 25,
  },
  title: {
    flex: 4,
    fontFamily: 'Montserrat-Black',
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  titleBig: {
    fontSize: 26,
  },
});

class Header extends Component {
  render() {
    const {
      onRightButtonPress,
      onLeftButtonPress,
      buttonLeftImage,
      buttonRightImage,
      big,
    } = this.props;

    const styleTitle = [styles.title];
    if (big) {
      styleTitle.push(styles.titleBig);
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={(onLeftButtonPress)}
        >
          <Image
            style={styles.icon}
            source={buttonLeftImage}
          />
        </TouchableOpacity>
        <Text style={styleTitle}>{this.props.title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={(onRightButtonPress)}
        >
          <Image
            style={styles.icon}
            source={buttonRightImage}
          />
        </TouchableOpacity>
      </View>
    );
  }

}

Header.propTypes = {
  big: PropTypes.bool,
  title: PropTypes.string,
  onLeftButtonPress: PropTypes.func,
  onRightButtonPress: PropTypes.func,
  buttonLeftImage: PropTypes.number,
  buttonRightImage: PropTypes.number,
};

module.exports = Header;

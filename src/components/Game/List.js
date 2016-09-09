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
    backgroundColor: '#2DB0CD',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    fontFamily: 'Varela Round',
    fontSize: 30,
    color: 'white',
  },
});

class List extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
        </View>
      </View>
    );
  }

}

module.exports = List;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';

export default class DojoIblMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'nope'
    };
  }

  componentDidMount() {
    Linking.addEventListener('url', urlHandler);

    const self = this;
    function urlHandler(e) {
      self.setState({
        url: e.url
      });

      Linking.removeEventListener('url', urlHandler);
    }

    Linking.openURL('https://www.rk02.net/redirect.php?url=dojoiblmobile://www.rafaelklaessen.nl');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          URL: {this.state.url}
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
  },
  welcome: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, .7)',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, .7)',
    marginBottom: 5,
  },
});

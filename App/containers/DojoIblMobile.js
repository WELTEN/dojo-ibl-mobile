import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';

var shittyQs = require('shitty-qs')

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
    function urlHandler(event) {

      console.log(event.url);
      var [, query_string] = event.url.match(/[^&?]*?=[^&?]*/)
      var query = shittyQs(query_string)
      console.log(query);
      console.log(query_string);

      if (state === query.state) {
        callback(null, query.access_token, query.uid)
      } else {
        callback(new Error('Oauth2 security error'))
      }

      Linking.removeEventListener('url', urlHandler);
    }
    Linking.openURL('https://wespot-arlearn.appspot.com/Login.html?client_id=dojo-ibl&redirect_uri=dojoiblmobile://dojo-ibl.appspot.com/oauth/wespot&response_type=code&scope=profile+email');
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

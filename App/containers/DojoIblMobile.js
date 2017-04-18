import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';
import { Config } from '../config'

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
      const requestToken = (event.url).split('code=')[1];

      fetch(`https://wespot-arlearn.appspot.com/oauth/token?client_id=${Config.wespot.clientId}&redirect_uri=http://localhost/callback&client_secret=${Config.wespot.clientSecret}&code=${requestToken}`, {
          method: 'post',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then((data) => {
          console.log('Request succeeded with JSON response', data);
          if (data.ok) {
            self.setState({
              url: data.statusText
            });
          } else {
            self.setState({
              url: 'Can\'t get access token!'
            });
          }
        })
        .catch((error) => {
          console.log('Request failed', error);
          self.setState({
            url: 'Can\'t get access token!'
          });
        });

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

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking,
  AsyncStorage
} from 'react-native';
import { Config } from '../config'

export default class DojoIblMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: 'No access token'
    };
  }

  componentDidMount() {
    this.handleUrls();
    Linking.openURL('https://wespot-arlearn.appspot.com/Login.html?client_id=dojo-ibl&redirect_uri=dojoiblmobile://dojo-ibl.appspot.com/oauth/wespot&response_type=code&scope=profile+email');
  }

  handleUrls() {
    Linking.addEventListener('url', urlHandler);

    const self = this;
    function urlHandler(event) {
      const requestToken = (event.url).split('code=')[1];

      fetch(`https://wespot-arlearn.appspot.com/oauth/token?client_id=${Config.wespot.clientId}&redirect_uri=${Config.wespot.redirectUri}&client_secret=${Config.wespot.clientSecret}&code=${requestToken}&grant_type=authorization_code`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then((response) => response.json())
        .then((json) => {
          if (json.access_token) {
            self.setState({
              accessToken: json.access_token
            });

            const expiresAt = Math.round(Date.now() / 1000) + json.expires_in;

            self.saveTokens(requestToken, json.access_token, expiresAt);
          } else {
            self.setState({
              accessToken: 'Can\'t get access token'
            });
          }
        })
        .catch((error) => {
          self.setState({
            accessToken: 'Logging in failed failed!'
          });
        });

      Linking.removeEventListener('url', urlHandler);
    }
  }

  saveTokens(authToken, accessToken, expiresAt) {
    AsyncStorage.setItem('tokens', JSON.stringify({
        authToken: authToken,
        accessToken: accessToken,
        expiresAt: expiresAt
      }))
      .then(() => {
        console.log('done')
      })
      .catch((error) => {
        console.log(error)
      });
  }

  getTokens() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to DojoIblMobile!
        </Text>
        <Text style={styles.text}>
          Access token: {this.state.accessToken}
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
  title: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, .7)',
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, .7)',
    marginBottom: 5,
  },
});

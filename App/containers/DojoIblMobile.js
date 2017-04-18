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

    this.urlHandler = this.urlHandler.bind(this);
  }

  componentDidMount() {
    this.getTokens().then((tokens) => {
        if (tokens) {
          this.setState({
            accessToken: 'Already saved'
          });
        } else {
          Linking.addEventListener('url', this.urlHandler);
          Linking.openURL('https://wespot-arlearn.appspot.com/Login.html?client_id=dojo-ibl&redirect_uri=dojoiblmobile://dojo-ibl.appspot.com/oauth/wespot&response_type=code&scope=profile+email');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    Linking.removeEventListener(this.urlHandler);
  }

  urlHandler(event) {
    const requestToken = (event.url).split('code=')[1];

    this.getAccessTokenJson().then((json) => {
        this.setState({
          accessToken: json.access_token
        });

        const expiresAt = Math.round(Date.now() / 1000) + json.expires_in;

        this.saveTokens(requestToken, json.access_token, expiresAt);
      })
      .catch((error) => {
        this.setState({
          accessToken: error
        });
      });
  }

  getAccessTokenJson(authToken) {
    return new Promise((resolve, reject) => {
      fetch(`https://wespot-arlearn.appspot.com/oauth/token?client_id=${Config.wespot.clientId}&redirect_uri=${Config.wespot.redirectUri}&client_secret=${Config.wespot.clientSecret}&code=${authToken}&grant_type=authorization_code`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then((response) => response.json())
        .then((json) => {
          if (json.access_token) {
            resolve(json);
          } else {
            reject('Couldn\'t get access token JSON');
          }
        })
        .catch((error) => {
          reject('Request failed!');
        });
    });
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
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('tokens')
        .then((tokensJson) => {
          const tokens = JSON.parse(tokensJson);
          resolve(tokens);
        })
        .catch((error) => {
          reject(error);
        })
    });
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

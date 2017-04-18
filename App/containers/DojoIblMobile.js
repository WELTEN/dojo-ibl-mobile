import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  AsyncStorage
} from 'react-native';
import { Config } from '../config';
import { globalStyles } from '../styles/globalStyles';

export default class DojoIblMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: 'No access token',
      loggedIn: false
    };

    this.openLoginPage = this.openLoginPage.bind(this);
    this.handleAuthToken = this.handleAuthToken.bind(this);
  }

  componentDidMount() {
    this.getTokens()
      .then((tokens) => {
        console.log(tokens)

        if (tokens && !this.accessTokenExpired(tokens)) {
          this.setState({
            loggedIn: true
          });
        } else if (tokens && this.accessTokenExpired(tokens)) {
          this.setState({
            loggedIn: true
          });

          this.refreshTokens(tokens).catch((error) => {
            console.log(error);

            this.setState({
              loggedIn: false
            });
          });
        } else {
          Linking.addEventListener('url', this.handleAuthToken);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    Linking.removeEventListener(this.handleAuthToken);
  }

  openLoginPage() {
    Linking.openURL('https://wespot-arlearn.appspot.com/Login.html?client_id=dojo-ibl&redirect_uri=dojoiblmobile://dojo-ibl.appspot.com/oauth/wespot&response_type=code&scope=profile+email')
  }

  handleAuthToken(event) {
    const authToken = (event.url).split('code=')[1];

    this.getAccessTokenJson(authToken)
      .then((json) => {
        this.setState({
          accessToken: json.access_token
        });

        const expiresAt = Math.round(Date.now() / 1000) + json.expires_in;

        return [authToken, json.access_token, expiresAt];
      })
      .then((tokens) => {
        this.saveTokens(tokens[0], tokens[1], tokens[2])
          .then(() => {
            this.setState({
              loggedIn: true
            });
          })
          .catch((error) => {
            console.log('Error');
          });
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
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem('tokens', JSON.stringify({
          authToken: authToken,
          accessToken: accessToken,
          expiresAt: expiresAt
        }))
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error)
        });
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

  accessTokenExpired(tokens) {
    const currentTime = Math.round(Date.now() / 1000);

    return tokens.expiresAt <= currentTime;
  }

  refreshTokens(oldTokens) {
    console.log('Logged in with expired token!')

    return new Promise((resolve, reject) => {
      this.getAccessTokenJson(oldTokens.authToken)
        .then((json) => {
          const expiresAt = Math.round(Date.now() / 1000) + json.expires_in;

          console.log(json)

          this.saveTokens(oldTokens.authToken, json.access_token, expiresAt)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>
            Welcome to DojoIblMobile!
          </Text>
          <Text style={globalStyles.text}>
            Please log in to continue:
          </Text>
          <Button
            onPress={this.openLoginPage}
            title="Log in"
            color="white"
            />
        </View>
      );
    } else {
      return (
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>Logged in!</Text>
          <Button
            onPress={() => { AsyncStorage.clear() }}
            title="Clear AsyncStorage"
            color="white"
            />
        </View>
      )
    }
  }
}

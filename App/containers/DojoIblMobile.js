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
import { Auth } from '../lib/Auth';

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
    Auth.getTokens()
      .then((tokens) => {
        console.log(tokens)

        if (tokens && !Auth.accessTokenExpired(tokens)) {
          this.setState({
            loggedIn: true
          });
        } else if (tokens && Auth.accessTokenExpired(tokens)) {
          this.setState({
            loggedIn: true
          });

          Auth.refreshTokens(tokens).catch((error) => {
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

    Auth.getAccessTokenJson(authToken)
      .then((json) => {
        this.setState({
          accessToken: json.access_token
        });

        const expiresAt = Math.round(Date.now() / 1000) + json.expires_in;

        return Auth.saveTokens(authToken, json.access_token, expiresAt);
      })
      .then(() => {
        this.setState({
          loggedIn: true
        });
      })
      .catch((error) => {
        this.setState({
          accessToken: error
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
            color="#4CAF50"
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
            color="#4CAF50"
            />
        </View>
      )
    }
  }
}

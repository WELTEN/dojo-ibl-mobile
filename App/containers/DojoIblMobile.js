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
import Auth from '../lib/Auth';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';

export default class DojoIblMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.openLoginPage = this.openLoginPage.bind(this);
    this.handleAuthToken = this.handleAuthToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    Auth.getTokens()
      .then((tokens) => {
        console.log(tokens)

        if (tokens && Auth.accessTokenExpired(tokens)) {
          this.setState({
            loggedIn: true,
            accessToken: tokens.accessToken
          });
        } else if (tokens && !Auth.accessTokenExpired(tokens)) {
          Auth.refreshTokens(tokens)
            .then((tokens) => {
              this.setState({
                loggedIn: true,
                accessToken: tokens.accessToken
              });
            })
            .catch((error) => {
              console.log(error);
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
      .catch((error) => {});
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
      .then((tokens) => {
        this.setState({
          loggedIn: true,
          accessToken: tokens.accessToken
        });
      })
      .catch((error) => {
        this.setState({
          accessToken: error
        });
      });
  }

  logout() {
    Auth.removeTokens()
      .then(() => {
        this.setState({
          loggedIn: false
        });
      })
      .catch((error) => {
        console.log('Error')
      });
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginPage openLoginPage={this.openLoginPage} />;
    } else {
      return <ProfilePage logout={this.logout} accessToken={this.state.accessToken} />;
    }
  }
}

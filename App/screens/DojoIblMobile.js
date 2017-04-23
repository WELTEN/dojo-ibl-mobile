import React, { Component } from 'react';
import {
  Alert,
  Linking
} from 'react-native';
import { config } from '../config';
import Auth from '../lib/Auth';
import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';

export default class DojoIblMobile extends Component {
  static navigationOptions = {
    title: 'DojoIblMobile'
  };

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.openLoginPage = this.openLoginPage.bind(this);
    this.handleAccessTokenUrl = this.handleAccessTokenUrl.bind(this);
    this.logoutWithConfirm = this.logoutWithConfirm.bind(this);
  }

  componentWillUnmount() {
    Linking.removeEventListener(this.handleAccessTokenUrl);
  }

  handleLoggedInState() {
    Linking.removeEventListener(this.handleAccessTokenUrl);

    Auth.getTokens()
      .then((tokens) => {
        if (tokens && !Auth.accessTokenExpired(tokens)) {
          this.setState({
            loggedIn: true,
            tokens: tokens
          });
        } else if (tokens && Auth.accessTokenExpired(tokens)) {
          console.log('Logged in with expired token! A new login is required.');
          this.logout();
        } else {
          Linking.addEventListener('url', this.handleAccessTokenUrl);
        }
      })
      .catch((error) => {
        //Alert.alert('Error', error);
        console.log(error)
      });
  }

  openLoginPage() {
    Linking.openURL(`https://wespot-arlearn.appspot.com/Login.html?client_id=${config.wespot.clientId}&redirect_uri=https://www.rk02.net/dojoiblauthredirect.php&response_type=code&scope=profile+email`)
      .catch((error) => {});
  }

  handleAccessTokenUrl(event) {
    const urlData = (event.url).split('/oauth/')[1].split('/');
    const accessToken = urlData[0];
    const expiresIn = urlData[2];
    const expiresAt = Auth.calcExpireAt(expiresIn);

    Auth.saveTokens(accessToken, expiresAt)
      .then((tokens) => {
        this.setState({
          loggedIn: true,
          tokens: tokens
        });
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  logoutWithConfirm() {
    Alert.alert(
      'Are you sure you want to log out?',
      'Are you sure you want to log out? You\'ll have to log in again to access your data.',
      [
        {text: 'Cancel'},
        {text: 'Logout', onPress: () => this.logout()}
      ]
    );
  }

  logout() {
    Auth.removeTokens()
      .then(() => {
        this.setState({
          loggedIn: false
        });
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  render() {
    this.handleLoggedInState();

    if (!this.state.loggedIn) {
      return <LoginPage openLoginPage={this.openLoginPage} />;
    } else {
      return <ProfilePage logout={this.logoutWithConfirm} tokens={this.state.tokens} />;
    }
  }
}

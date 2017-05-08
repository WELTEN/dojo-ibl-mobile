import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Platform
} from 'react-native';
import { config } from '../config';
import Auth from '../lib/Auth';
import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';
import AllGroups from './AllGroups';
import { colors } from '../styles/colors';
import { TabNavigator } from 'react-navigation';

export default class DojoIblMobile extends Component {
  static navigationOptions = {
    title: 'Home',
    header: Platform.OS == 'android' ? null : undefined
  };

  state = { loggedIn: false };

  tabBarOptionsAndroid = {
    activeTintColor: colors.backgroundColor,
    inactiveTintColor: `rgba(${colors.backgroundColorRgb}, .7)`,
    pressColor: colors.secondaryTextColor,
    style: {
      backgroundColor: colors.textColor
    },
    indicatorStyle: {
      backgroundColor: colors.secondaryTextColor
    }
  };

  TabNav = TabNavigator({
      ProfilePage: { screen: ProfilePage },
      AllGroups: { screen: AllGroups }
    }, {
      initialRouteName: 'ProfilePage',
      lazy: true,
      tabBarOptions: Platform.OS == 'android' ? this.tabBarOptionsAndroid : {}
    });

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
        console.log(error)
        Alert.alert('Error', error);
      });
  }

  openLoginPage = () => {
    Linking.openURL(`https://wespot-arlearn.appspot.com/Login.html?client_id=${config.wespot.clientId}&redirect_uri=https://www.rk02.net/dojoiblauthredirect.php&response_type=code&scope=profile+email`)
      .catch((error) => {});
  }

  handleAccessTokenUrl = (event) => {
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

  logoutWithConfirm = () => {
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

    const { navigate } = this.props.navigation;

    if (!this.state.loggedIn) {
      return <LoginPage openLoginPage={this.openLoginPage} />;
    } else {
      const TabNav = this.TabNav;

      return (
        <TabNav
          screenProps={{
            logout: this.logoutWithConfirm,
            tokens: this.state.tokens,
            navigate: navigate
          }}
          />
      );
    }
  }
}

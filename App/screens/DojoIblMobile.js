import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  Linking,
  NetInfo,
  Platform
} from 'react-native';
import { config } from '../config';
import Auth from '../lib/Auth';
import LoadingPage from '../components/LoadingPage';
import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';
import AllGroups from './AllGroups';
import { colors } from '../styles/colors';
import { TabNavigator } from 'react-navigation';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: (token) => {
    console.log('TOKEN:', token);
  },

  onNotification: (notification) => {
    console.log('NOTIFICATION:', notification);
  },

  senderID: 'YOUR GCM SENDER ID',

  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  popInitialNotification: true,
  requestPermissions: true,
});

function sendNotif() {
  console.log('Sending the notification')
  PushNotification.localNotificationSchedule({
    title: 'Test',
    message: 'Testing!',
    number: '1',
    date: new Date(Date.now() + 10000)
  });
}

export default class DojoIblMobile extends Component {
  static navigationOptions = {
    title: 'Home',
    header: Platform.OS == 'android' ? null : undefined
  };

  state = {
    loggedIn: false,
    tokensLoaded: false
  };

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
        this.setState({ tokensLoaded: true });

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
    sendNotif();
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

        this.handleLoggedInState();

        const itemsToDelete = ['profile', 'groups', 'activities', 'comments'];
        for (let item of itemsToDelete) {
          AsyncStorage.removeItem(item);
        }
      });
  }

  componentDidMount() {
    this.handleLoggedInState();

    NetInfo.fetch().done((connectionType) => {
      this.handleConnectionType(connectionType);
    });
    NetInfo.addEventListener('change', this.handleConnectionType);
  }

  handleConnectionType = (connectionType) => {
    if (connectionType == 'none') {
      Alert.alert(
        'No internet connection',
        'Without an internet connection, your data won\'t be updated. Reconnect to update.',
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    if (!this.state.tokensLoaded) {
      return <LoadingPage />
    }

    if (!this.state.loggedIn) {
      return <LoginPage openLoginPage={this.openLoginPage} />;
    } else {
      return (
        <this.TabNav
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

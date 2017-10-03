import React, { Component } from 'react';
import glamorous from 'glamorous-native';
import { GoogleSignin } from 'react-native-google-signin';
import {
  getUserFromStorage,
  setUserInStorage,
  deleteUserFromStorage,
  setTokenInStorage,
  deleteTokenFromStorage,
  getTokenFromStorage
} from '../lib/Storage';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import Home from './Home';
import Login from './Login';
import LoadingScreen from './LoadingScreen';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center'
});

export default class DojoIblMobile extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  };

  state = {
    loggedIn: false,
    loading: true,
    token: null,
    error: ''
  };

  componentWillMount() {
    this.setupGoogleSignin().then(() => {
      GoogleSignin.currentUserAsync().then(this.handleGoogleUser);
    });

    getUserFromStorage().then(([ email, password ]) => {
      if (email && password) this.authUser(email, password);
      else this.setState({ loading: false });
    });
  }

  setupGoogleSignin = () =>
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
        iosClientId: '518897628174-u6ufotog815h8nm5lbibm8inictcvsh2.apps.googleusercontent.com',
        webClientId: '518897628174-u6ufotog815h8nm5lbibm8inictcvsh2.apps.googleusercontent.com'
      });
    }).catch((error) => {
      alert(`Play services error, ${error.code}, ${error.message}`);
    });

  handleGoogleUser = (user) => {
    if (user) {
      this.setState({ error: '' });
      this.authGoogleUser(user);
    } else {
      this.setState({ loggedIn: false, user: null });
    }
  }

  authGoogleUser = (user) => {
    if (firebase.auth().currentUser) firebase.auth().signOut();

    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    firebase.auth().signInWithCredential(credential).then((user) => {
      this.setState({ loggedIn: true, user });
      this.authWithServer(user.He);
    }).catch((error) => {
      console.log(error);
    });
  }

  authUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this.setState({ loggedIn: true, error: '', user });
      setUserInStorage(email, password);
      this.authWithServer(user.He);
    }).catch((error) => {
      this.setState({ error: error.message });
    });
  }

  authWithServer = (accessToken) => {
    deleteTokenFromStorage();
    fetch('https://dojo-ibl.appspot.com/rest/oauth/authenticate', {
        method: 'POST',
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(({ token }) => {
        this.setState({ loading: false, token });
        setTokenInStorage(token);
      });
  }

  onLogin = () => {
    GoogleSignin.signIn()
      .then(this.handleGoogleUser)
      .catch(console.log);
  }

  onLogout = () => {
    firebase.auth().signOut();
    deleteUserFromStorage();
    deleteTokenFromStorage();
    GoogleSignin.signOut().then(this.handleGoogleUser);
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />
    } else {
      if (this.state.loggedIn && this.state.token) {
        return (
          <Home
            user={this.state.user}
            token={this.state.token}
            onLogout={this.onLogout}
            navigate={this.props.navigation.navigate}
          />
        );
      } else {
        return (
          <Login
            onLogin={this.onLogin}
            onSubmit={this.authUser}
            error={this.state.error}
          />
        );
      }
    }
  }
}

DojoIblMobile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

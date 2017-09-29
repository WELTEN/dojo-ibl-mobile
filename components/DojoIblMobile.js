import React, { Component } from 'react';
import glamorous from 'glamorous-native';
import { GoogleSignin } from 'react-native-google-signin';
import {
  getUserFromStorage,
  setUserInStorage,
  deleteUserFromStorage
} from '../lib/Storage';
import * as firebase from 'firebase';
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
    }).catch((err) => {
      alert(`Play services error, ${err.code}, ${err.message}`);
    });

  handleGoogleUser = (user) => {
    if (user) {
      this.setState({ loggedIn: true, loading: false, user, error: '' });
      this.authGoogleUser(user);
    } else {
      this.setState({ loggedIn: false, user: null });
    }
  }

  authGoogleUser = (user) => {
    if (firebase.auth().currentUser) firebase.auth().signOut();

    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log(error);
    });
  }

  authUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this.setState({ loggedIn: true, loading: false, error: '', user });
      setUserInStorage(email, password);
    }).catch((error) => {
      this.setState({ error: error.message });
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
    GoogleSignin.signOut().then(this.handleGoogleUser);
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />
    } else {
      if (this.state.loggedIn) {
        return <Home user={this.state.user} onLogout={this.onLogout} />;
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

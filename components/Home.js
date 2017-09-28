import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  TouchableHighlight
} from 'react-native';
import glamorous from 'glamorous-native';
import { GoogleSignin } from 'react-native-google-signin';
import {
  getUserFromStorage,
  setUserInStorage,
  deleteUserFromStorage
} from '../lib/Storage';
import * as firebase from 'firebase';
import Login from './Login';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center'
});

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  };

  state = {
    loggedIn: false,
    loading: true
  };

  componentWillMount() {
    this.setupGoogleSignin().then(() => {
      GoogleSignin.currentUserAsync().then(this.handleGoogleUser);
    });

    getUserFromStorage().then(([ email, password ]) => {
      if (email && password) this.authUser(email, password);
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
      this.setState({ loggedIn: true, loading: false, user });
      this.authGoogleUser(user);
    } else {
      this.setState({ loggedIn: false, loading: false, user: null });
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
    if (this.state.loggedIn) {
      return (
        <Container>
          <Text>{this.state.user.email}</Text>
          <TouchableHighlight onPress={this.onLogout}>
            <Text>Logout</Text>
          </TouchableHighlight>
        </Container>
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

import React, { Component } from 'react';
import { AsyncStorage, Text, TouchableHighlight, TextInput } from 'react-native';
import glamorous from 'glamorous-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import * as firebase from 'firebase';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center'
});

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    loggedIn: false,
    loading: true,
    email: '',
    password: ''
  };

  componentWillMount() {
    this.setupGoogleSignin().then(() => {
      GoogleSignin.currentUserAsync().then(this.handleGoogleUser);
    });

    this.getUserFromStorage().then(([ email, password ]) => {
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

  getUserFromStorage = () => Promise.all([
    AsyncStorage.getItem('email'),
    AsyncStorage.getItem('password')
  ]);

  setUserInStorage = (email, password) => Promise.all([
    AsyncStorage.setItem('email', email),
    AsyncStorage.setItem('password', password)
  ]);

  deleteUserFromStorage = () => Promise.all([
    AsyncStorage.removeItem('email'),
    AsyncStorage.removeItem('password')
  ]);

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

  onSubmit = () => this.authUser(this.state.email, this.state.password);

  authUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this.setState({ loggedIn: true, loading: false, user });
      this.setUserInStorage(email, password);
    }).catch((error) => {
      console.log(error)
    });
  }

  onLogin = () => {
    GoogleSignin.signIn().then(this.handleGoogleUser);
  }

  onLogout = () => {
    firebase.auth().signOut();
    this.deleteUserFromStorage();
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
        <Container>
          <Text>DojoIBL</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder="username"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableHighlight onPress={this.onSubmit}>
            <Text>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onLogin}>
            <Text>Login with Google</Text>
          </TouchableHighlight>
        </Container>
      );
    }
  }
}

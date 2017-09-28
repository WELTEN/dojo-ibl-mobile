import React, { Component } from 'react';
import { Text, TouchableHighlight, TextInput } from 'react-native';
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
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
        iosClientId: '518897628174-u6ufotog815h8nm5lbibm8inictcvsh2.apps.googleusercontent.com',
        webClientId: '518897628174-u6ufotog815h8nm5lbibm8inictcvsh2.apps.googleusercontent.com'
      });
      GoogleSignin.currentUserAsync().then(this.handleUser);
    }).catch((err) => {
      alert(`Play services error, ${err.code}, ${err.message}`);
    });
  }

  handleUser = (user) => {
    if (user) {
      this.setState({ loggedIn: true, loading: false, user });
      this.authGoogleUser(user);
    } else {
      this.setState({ loggedIn: false, loading: false, user: null });
    }
  }

  authGoogleUser = (user) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!this.isUserEqual(user, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);

        firebase.auth().signInWithCredential(credential).catch((error) => {
          console.log(error);
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  isUserEqual = (user, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === user.id) {
          return true;
        }
      }
    }
    return false;
  }

  onSubmit = () => this.authUser(this.state.email, this.state.password);

  authUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this.setState({ loggedIn: true, loading: false, user });
    }).catch(function(error) {
      console.log(error)
    });
  }

  onLogin = () => {
    GoogleSignin.signIn().then(this.handleUser);
  }

  onLogout = () => {
    firebase.auth().signOut();
    GoogleSignin.signOut().then(this.handleUser);
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

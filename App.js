import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import firebaseConfig from './firebaseConfig';
import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

const App = StackNavigator({
  Home: { screen: Home }
}, {
  intialRouteName: 'Home'
});

export default App;

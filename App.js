import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import DojoIblMobile from './components/DojoIblMobile';
import Run from './components/Run';
import Activity from './components/Activity';
import firebaseConfig from './firebaseConfig';
import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

const App = StackNavigator({
  Home: { screen: DojoIblMobile },
  Run: { screen: Run },
  Activity: { screen: Activity }
}, {
  intialRouteName: 'Home',
  headerMode: 'screen'
});

export default App;

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';

const App = StackNavigator({
  Home: { screen: Home }
}, {
  intialRouteName: 'Home'
});

export default App;

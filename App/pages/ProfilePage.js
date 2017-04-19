import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default class ProfilePage extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Logged in!</Text>
        <Button
          onPress={() => { AsyncStorage.clear() }}
          title="Clear AsyncStorage"
          color="#4CAF50"
          />
      </View>
    );
  }
}

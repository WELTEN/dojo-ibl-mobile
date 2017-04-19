import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default class LoginPage extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>
          Welcome to DojoIblMobile!
        </Text>
        <Text style={globalStyles.text}>
          Please log in to continue:
        </Text>
        <Button
          onPress={this.props.openLoginPage}
          title="Log in"
          color="#4CAF50"
          />
      </View>
    );
  }
}
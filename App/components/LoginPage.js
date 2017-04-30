import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

export default class LoginPage extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.centeredTitle}>
          Welcome to DojoIblMobile!
        </Text>
        <Text style={globalStyles.text}>
          Please log in to continue:
        </Text>
        <Button
          onPress={this.props.openLoginPage}
          title='Log in'
          color={colors.secondaryTextColor}
          />
      </View>
    );
  }
}

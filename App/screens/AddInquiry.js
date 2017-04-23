import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class AddInquiry extends Component {
  static navigationOptions = {
    title: 'Add inquiry'
  };

  render() {
    return (
      <Text>All inquiries</Text>
    );
  }
}

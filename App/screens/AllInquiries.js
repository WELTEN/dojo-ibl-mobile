import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class AllInquiries extends Component {
  static navigationOptions = {
    title: 'All inquiries'
  };

  render() {
    return (
      <Text>All inquiries</Text>
    );
  }
}

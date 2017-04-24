import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class Inquiry extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.inquiry.title
  });

  constructor(props) {
    super(props);

    this.inquiry = this.props.navigation.state.params.inquiry;
  }

  render() {
    return (
      <Text>{JSON.stringify(this.inquiry)}</Text>
    );
  }
}

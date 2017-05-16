import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Utils from '../lib/Utils';
import RequestUtils from '../lib/RequestUtils';

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.groupName
  });

  runId = this.props.navigation.state.params.runId;
  tokens = this.props.navigation.state.params.tokens;

  render() {
    return (
      <Text>Ma boi</Text>
    );
  }
}

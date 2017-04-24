import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class InquiryListItem extends Component {
  render() {
    console.log(this.props.inquiry)
    return (
      <View>
        <Text>{this.props.inquiry.gameId}</Text>
      </View>
    );
  }
}

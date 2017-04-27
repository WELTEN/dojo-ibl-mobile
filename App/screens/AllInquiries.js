import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Auth from '../lib/Auth';
import AllInquiriesList from '../components/AllInquiriesList';

export default class AllInquiries extends Component {
  static navigationOptions = {
    tabBarLabel: 'All inquiries'
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
        <Text style={globalStyles.whiteTitle}>All inquiries</Text>
        <AllInquiriesList navigate={this.props.screenProps.navigate} />
      </ScrollView>
    );
  }
}

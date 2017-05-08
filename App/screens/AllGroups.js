import React, { PureComponent } from 'react';
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
import AllGroupsList from '../components/AllGroupsList';

export default class AllGroups extends PureComponent {
  static navigationOptions = {
    tabBarLabel: 'All groups'
  };

  shouldComponentUpdate() { return false; }

  render() {
    return (
      <ScrollView style={globalStyles.containerScrollView}>
        <Text style={globalStyles.title}>All groups</Text>
        <AllGroupsList navigate={this.props.screenProps.navigate} tokens={this.props.screenProps.tokens} />
      </ScrollView>
    );
  }
}

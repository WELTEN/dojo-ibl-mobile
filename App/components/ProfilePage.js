import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import ProfileHeader from './ProfileHeader';

export default class ProfilePage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile'
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
        <ProfileHeader tokens={this.props.screenProps.tokens} />
        <TouchableHighlight onPress={this.props.screenProps.logout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableHighlight>
        <Text style={globalStyles.whiteTitle}>Upcoming activities</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logoutBtn: {
    padding: 10,
    color: colors.secondaryTextColor,
    backgroundColor: colors.textColor,
    textAlign: 'center'
  }
});

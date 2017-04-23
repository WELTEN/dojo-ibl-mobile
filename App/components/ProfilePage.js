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
  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
        <ProfileHeader tokens={this.props.tokens} />
        <TouchableHighlight onPress={this.props.logout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableHighlight>
        <Text style={styles.tasksTitle}>Upcoming activities</Text>
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
  },
  tasksTitle: {
    margin: 20,
    color: colors.textColor,
    fontSize: 24,
    fontWeight: '300'
  }
});

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
import Drawer from 'react-native-drawer';
import ProfileHeader from './ProfileHeader';
import { drawerSettings } from '../config/drawerSettings';
import DrawerContent from '../components/DrawerContent';

export default class ProfilePage extends Component {
  openDrawer = () => {
    this._drawer.open();
  }

  render() {
    return (
        <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
          <ProfileHeader tokens={this.props.screenProps.tokens} openDrawer={this.openDrawer} />
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

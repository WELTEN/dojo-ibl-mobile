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
      <Drawer
        ref={(ref) => this._drawer = ref}
        {...drawerSettings}
        content={<DrawerContent navigate={this.props.navigate} />}>
        <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
          <ProfileHeader tokens={this.props.tokens} openDrawer={this.openDrawer} />
          <TouchableHighlight onPress={this.props.logout}>
            <Text style={styles.logoutBtn}>Logout</Text>
          </TouchableHighlight>
          <Text style={globalStyles.whiteTitle}>Upcoming activities</Text>
        </ScrollView>
      </Drawer>
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

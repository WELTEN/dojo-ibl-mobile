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

export default class ProfilePage extends Component {
  closeControlPanel = () => {
    this._drawer.close();
  };

  openControlPanel = () => {
    this._drawer.open();
  };

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type='static'
        content={<View><Text>woopwoop</Text></View>}
        openDrawerOffset={0.2}
        styles={drawerStyles}
        tapToClose={true}
        tweenHandler={Drawer.tweenPresets.parallax}
        closedDrawerOffset={-3}
        >
        <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
          <ProfileHeader tokens={this.props.tokens} />
          <TouchableHighlight onPress={this.openControlPanel}>
            <Text style={styles.logoutBtn}>Logout</Text>
          </TouchableHighlight>
          <Text style={styles.tasksTitle}>Upcoming activities</Text>
        </ScrollView>
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
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

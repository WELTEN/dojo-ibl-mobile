import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import RequestUtils from '../lib/RequestUtils';
import materialWallpaper from '../img/material-wallpaper.jpg';
import defaultProfilePicture from '../img/default-profile-picture.png';

export default class ProfileHeader extends Component {
  state = { profileData: {} };

  componentDidMount() {
    this.loadProfileData();
  }

  loadProfileData() {
    AsyncStorage.getItem('profile').then((profileData) => {
      if (profileData == null || typeof profileData == 'undefined') {
        this.loadProfileDataFromServer();
      } else {
        // Profile data can't be changed, so we don't have to do a request to
        // the server after we've loaded the local data.
        this.setState({
          profileData: JSON.parse(profileData)
        });
      }
    });
  }

  loadProfileDataFromServer() {
    console.log('Loading profile data from server');
    RequestUtils.requestWithToken('account/myAccountDetails', this.props.tokens)
      .then((profileData) => {
        this.setState({
          profileData: profileData
        });

        AsyncStorage.setItem('profile', JSON.stringify(profileData));
      });
  }

  getProfilePicture = () => {
    if (typeof this.state.profileData.picture == 'undefined' || this.state.profileData.picture == '') {
      return (
        <Image
          style={styles.headerProfilePicture}
          source={defaultProfilePicture}
        />
      );
    } else {
      return (
        <Image
          style={styles.headerProfilePicture}
          source={{uri: this.state.profileData.picture}}
        />
      );
    }
  }

  render() {
    return (
      <View>
        <Image
          style={styles.headerBackground}
          source={materialWallpaper}
          resizeMode='cover'
          />
        <View style={styles.header}>
          {this.getProfilePicture()}
          <Text style={styles.headerName}>{typeof this.state.profileData.name == 'undefined' ? 'Loading' : this.state.profileData.name}</Text>
          <Text style={styles.headerEmail}>{typeof this.state.profileData.email == 'undefined' ? 'Loading' : this.state.profileData.email}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    width: sizes.window.width,
    height: sizes.header.height,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: sizes.header.height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerProfilePicture: {
    marginBottom: sizes.header.height / 20,
    width: sizes.header.profilePicture,
    height: sizes.header.profilePicture,
    borderRadius: sizes.header.profilePicture / 2
  },
  headerName: {
    color: colors.textColor,
    backgroundColor: 'transparent',
    fontWeight: '300',
    fontSize: 24,
    width: sizes.window.width,
    textAlign: 'center'
  },
  headerEmail: {
    color: colors.textColor,
    backgroundColor: 'transparent',
    fontSize: 12,
    opacity: 0.7
  },
  menuBtn: {
    position: 'absolute',
    top: sizes.offset,
    left: sizes.offset
  },
  menuBtnImg: {
    width: 24,
    height: 16
  }
});

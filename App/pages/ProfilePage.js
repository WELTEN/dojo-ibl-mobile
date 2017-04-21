import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  Button,
  AsyncStorage,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: {}
    };

    this.getProfilePicture = this.getProfilePicture.bind(this);
  }

  componentDidMount() {
    this.loadProfileData();
  }

  loadProfileData() {
    fetch('https://dojo-ibl.appspot.com/rest/account/myAccountDetails', {
        method: 'get',
        headers: {
          'Authorization': `GoogleLogin auth=${this.props.tokens.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          profileData: json
        });

        console.log(json)
      });
  }

  getProfilePicture() {
    if (typeof this.state.profileData.picture == 'undefined' || this.state.profileData.picture == '') {
      return (
        <Image
          style={styles.headerProfilePicture}
          source={require('../img/default-profile-picture.png')}
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
      <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
        <Image
          style={styles.headerBackground}
          source={require('../img/material-wallpaper.jpg')}
          resizeMode='cover'
        />
        <View style={styles.header}>
          {this.getProfilePicture()}
          <Text style={styles.headerName}>{typeof this.state.profileData.name == 'undefined' ? 'Loading' : this.state.profileData.name}</Text>
          <Text style={styles.headerEmail}>{typeof this.state.profileData.email == 'undefined' ? 'Loading' : this.state.profileData.email}</Text>
        </View>
        <TouchableHighlight onPress={this.props.logout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableHighlight>
        <Text style={styles.tasksTitle}>Upcoming activities</Text>
      </ScrollView>
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

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
        // Temporary fake account JSON because the actual JSON doesn't work yet
        json = {
          type: 'org.celstec.arlearn2.beans.account.Account',
          localId: 'rafaelklaessen',
          accountType: 5,
          email: 'rafaelklaessen@agoraroermond.nl',
          name: 'Rafael Klaessen',
          givenName: 'Rafael',
          familyName: 'Klaessen',
          picture: '',
          accountLevel: 2,
          allowTrackLocation: false
        };

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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height * 0.3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerProfilePicture: {
    marginBottom: Dimensions.get('window').height * 0.3 / 20,
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    borderRadius: (Dimensions.get('window').width * 0.15) / 2
  },
  headerName: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    fontWeight: '300',
    fontSize: 24,
    width: Dimensions.get('window').width,
    textAlign: 'center'
  },
  headerEmail: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    fontSize: 12,
    opacity: 0.7
  },
  logoutBtn: {
    padding: 10,
    color: '#1AB394',
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  tasksTitle: {
    margin: 20,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300'
  }
});

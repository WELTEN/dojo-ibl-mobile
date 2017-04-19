import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: null
    };
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
        console.log(`GoogleLogin auth=${this.props.tokens.accessToken}`)
        console.log(json)
      });
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Logged in!</Text>
        <Text style={globalStyles.text}>Logged in with access token: {JSON.stringify(this.props.tokens)}</Text>
        <Text style={globalStyles.text}>ProfileData: {JSON.stringify(this.state.profileData)}</Text>
        <Button
          onPress={this.props.logout}
          title="Logout"
          color="#4CAF50"
          />
      </View>
    );
  }
}

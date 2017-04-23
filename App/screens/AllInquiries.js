import React, { Component } from 'react';
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

export default class AllInquiries extends Component {
  static navigationOptions = {
    title: 'All inquiries'
  };

  constructor(props) {
    super(props);

    this.state = {
      inquiries: {}
    }
  }

  componentDidMount() {
    Auth.getTokens()
      .then((tokens) => {
        this.loadInquiries(tokens);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  }

  loadInquiries(tokens) {
    fetch('https://dojo-ibl.appspot.com/rest/myGames', {
        method: 'get',
        headers: {
          'Authorization': `GoogleLogin auth=${tokens.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          inquiries: json.games
        });

        console.log(json)
      });
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
        <Text style={globalStyles.whiteTitle}>All inquiries</Text>
      </ScrollView>
    );
  }
}

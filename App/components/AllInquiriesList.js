import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Auth from '../lib/Auth';
import InquiryListItem from './InquiryListItem';

export default class AllInquiriesList extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      inquiries: this.ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    Auth.getTokens()
      .then((tokens) => {
        console.log(tokens)
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
          inquiries: this.ds.cloneWithRows(json.games)
        });

        console.log(json)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.inquiries}
          renderRow={(inquiry) => <InquiryListItem inquiry={inquiry} />}
          enableEmptySections={true}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20
  }
});

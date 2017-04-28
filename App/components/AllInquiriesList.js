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
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  state = {
    inquiries: this.ds.cloneWithRows([])
  };

  componentWillMount() {
    this.loadInquiries(this.props.tokens);
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
          renderRow={(inquiry) =>
            <InquiryListItem
              inquiry={inquiry}
              onPress={() => this.props.navigate('Inquiry', { inquiry: inquiry })}
              />
          }
          enableEmptySections={true}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: sizes.offset,
    marginRight: sizes.offset
  }
});

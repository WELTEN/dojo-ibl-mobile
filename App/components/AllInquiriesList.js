import React, { Component } from 'react';
import {
  FlatList,
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
  state = {
    inquiries: []
  };

  componentDidMount() {
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
          inquiries: json.games
        });

        console.log(json)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.inquiries}
          renderItem={({item}) =>
            <InquiryListItem
              inquiry={item}
              onPress={() => this.props.navigate('Inquiry', { inquiry: item })}
            />
          }
          keyExtractor={(item, index) => index}
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

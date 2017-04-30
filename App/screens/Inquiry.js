import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Phase from '../components/Phase';
import Utils from '../lib/Utils';

export default class Inquiry extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.inquiry.title
  });

  inquiry = this.props.navigation.state.params.inquiry;

  render() {
    return (
      <ScrollView style={globalStyles.containerScrollView}>
        <Text style={globalStyles.title}>{this.inquiry.title}</Text>
        {this.inquiry.description &&
          <Text style={globalStyles.leftText}>
            {Utils.removeHtmlTagsFromString(this.inquiry.description)}
          </Text>
        }
        <FlatList
          data={this.inquiry.phases}
          renderItem={({item}) =>
            <Phase phase={item} />
          }
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    );
  }
}

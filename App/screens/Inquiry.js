import React, { Component } from 'react';
import {
  ListView,
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
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  phases = this.ds.cloneWithRows(this.inquiry.phases);

  render() {
    return (
      <ScrollView style={globalStyles.containerScrollView}>
        <Text style={globalStyles.whiteTitle}>{this.inquiry.title}</Text>
        {this.inquiry.description &&
          <Text style={globalStyles.leftText}>
            {Utils.removeHtmlTagsFromString(this.inquiry.description)}
          </Text>
        }
        <ListView
          dataSource={this.phases}
          renderRow={(phase) =>
            <Phase phase={phase} />
          }
          enableEmptySections={true}
          />
      </ScrollView>
    );
  }
}

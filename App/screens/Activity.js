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
import PhaseList from '../components/PhaseList';
import Utils from '../lib/Utils';

export default class Activity extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.activity.name
  });

  activity = this.props.navigation.state.params.activity;
  tokens = this.props.navigation.state.params.tokens;

  render() {

    return (
      <ScrollView style={globalStyles.containerScrollView}>
        <Text style={globalStyles.title}>{this.activity.name}</Text>
        {this.activity.richtText &&
          <Text style={globalStyles.leftText}>
            {Utils.removeHtmlTagsFromString(this.activity.richText)}
          </Text>
        }
      </ScrollView>
    );
  }
}

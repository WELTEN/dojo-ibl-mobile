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
import Phase from '../components/Phase';
import Utils from '../lib/Utils';

export default class Group extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.group.title
  });

  group = this.props.navigation.state.params.group;

  render() {
    return (
      <ScrollView style={globalStyles.containerScrollView}>
        <Text style={globalStyles.title}>{this.group.title}</Text>
        {this.group.game.description &&
          <Text style={globalStyles.leftText}>
            {Utils.removeHtmlTagsFromString(this.group.game.description)}
          </Text>
        }
        <PhaseList phases={this.group.game.phases} />
      </ScrollView>
    );
  }
}

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Utils from '../lib/Utils';

export default class ActivityListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View>
          <Text>{this.props.activity.name}</Text>
          {this.props.activity.richText &&
            <Text>
              {Utils.removeHtmlTagsFromString(this.props.activity.richText)}
            </Text>
          }
        </View>
      </TouchableHighlight>
    );
  }
}

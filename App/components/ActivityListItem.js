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
        <View style={styles.activity}>
          <Text style={styles.activityName}>{this.props.activity.name}</Text>
          {this.props.activity.richText &&
            <Text style={styles.activityText}>
              {Utils.removeHtmlTagsFromString(this.props.activity.richText)}
            </Text>
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  activity: {
    marginBottom: sizes.offset / 2,
    padding: sizes.offset / 2,
    backgroundColor: colors.textColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.backgroundColor,
    borderRadius: 2
  },
  activityTitle: {
    fontWeight: '700'
  },
  activityText: {
    marginTop: 2,
    color: colors.backgroundColor
  }
});

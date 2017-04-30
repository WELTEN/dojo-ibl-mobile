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

export default class InquiryListItem extends Component {
  inquiryDescription = Utils.removeHtmlTagsFromString(this.props.inquiry.description || '');

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.inquiry}>
          <Text style={styles.inquiryTitle}>{this.props.inquiry.title}</Text>
          {this.inquiryDescription.length != 0 &&
            <Text style={styles.inquiryDescription}>
              {this.inquiryDescription}
            </Text>
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  inquiry: {
    marginBottom: sizes.offset / 2,
    padding: sizes.offset / 2,
    backgroundColor: `rgba(${colors.textColorRgb}, .8)`,
    borderRadius: 2
  },
  inquiryTitle: {
    fontSize: 18,
    fontWeight: '300'
  },
  inquiryDescription: {
    marginTop: 2,
    color: colors.backgroundColor
  }
});

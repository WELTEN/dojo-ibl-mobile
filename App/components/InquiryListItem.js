import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class InquiryListItem extends Component {
  constructor(props) {
    super(props);

    this.inquiryTitle = this.removeHtmlTagsFromString(this.props.inquiry.title);
    this.inquiryDescription = this.removeHtmlTagsFromString(this.props.inquiry.description || '');
  }

  removeHtmlTagsFromString(string) {
    return string.replace(/<(?:.|\n)*?>/gm, '');
  }

  render() {
    console.log(this.props.inquiry)
    return (
      <View style={styles.inquiry}>
        <Text style={styles.inquiryTitle}>{this.inquiryTitle}</Text>
        {this.inquiryDescription.length != 0 && <Text style={styles.inquiryDescription}>{this.inquiryDescription}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inquiry: {
    marginBottom: sizes.offset / 2,
    padding: sizes.offset / 2,
    backgroundColor: 'white',
    opacity: 0.8,
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

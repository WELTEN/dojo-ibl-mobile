import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Utils from '../lib/Utils';

export default class CommentListItem extends Component {
  render() {
    console.log(this.props.comment)
    return (
      <View style={styles.comment}>
        <Text style={styles.commentUsername}>
          {this.props.comment.userEmail.replace('5:', '')}
        </Text>
        <Text style={styles.commentDescription}>
          {Utils.removeHtmlTagsFromString(this.props.comment.responseValue)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  comment: {
    paddingTop: sizes.offset / 2,
    paddingBottom: sizes.offset / 2,
    paddingLeft: sizes.offset,
    paddingRight: sizes.offset,
    backgroundColor: colors.textColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.backgroundColor
  },
  commentUsername: {
    fontWeight: '700'
  },
  commentDescription: {
    marginTop: 2,
    color: colors.backgroundColor
  }
});

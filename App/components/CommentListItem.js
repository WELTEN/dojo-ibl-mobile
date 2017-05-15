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
import RequestUtils from '../lib/RequestUtils';

export default class CommentListItem extends Component {
  state = {
    parentComment: Utils.getParentComment(this.props.comment.parentId, this.props.comments)
  };

  componentDidMount() {
    if (!this.state.parentComment && this.props.comment.parentId) {
      console.log('Parent comment isn\'t loaded yet! Loading it.');
      RequestUtils.requestWithToken(`response/responseId/${this.props.comment.parentId}`, this.props.tokens)
        .then((response) => {
          this.setState({
            parentComment: response
          });

          console.log(response);
        })
        .catch((error) => {
          this.setState({
            parentComment: {
              responseValue: 'Comment deleted'
            }
          });
        });
    }
  }

  render() {
    return (
      <View style={styles.comment}>
        <Text style={styles.commentUsername}>
          {this.props.comment.userEmail.replace('5:', '')}
        </Text>
        {this.state.parentComment &&
          <View style={styles.quote}>
            {this.state.parentComment.userEmail &&
              <Text style={styles.commentUsername}>
                {this.state.parentComment.userEmail.replace('5:', '')}
              </Text>
            }
            <Text style={styles.quoteText}>{Utils.removeHtmlTagsFromString(this.state.parentComment.responseValue)}</Text>
          </View>
        }
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
  },
  quote: {
    marginTop: sizes.offset / 4,
    marginBottom: sizes.offset / 4,
    padding: sizes.offset / 2,
    backgroundColor: `rgba(${colors.backgroundColorRgb}, .1)`,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.backgroundColor,
    borderRadius: 2
  },
  quoteText: {
    color: colors.backgroundColor
  }
});

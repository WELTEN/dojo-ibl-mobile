import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import { removeHtmlTags, getPictureUrl } from '../../lib/Text';
import moment from 'moment';

const width = Dimensions.get('window').width - 48;

const Item = glamorous.view({
  marginBottom: 16,
  paddingLeft: 24,
  paddingRight: 24,
  width: width - 48,
  flexDirection: 'row'
});

const Picture = glamorous.image({
  marginRight: 12,
  width: 36,
  height: 36,
  borderRadius: 18
});

const Content = glamorous.view({});

const Name = glamorous.text({
  marginBottom: 4,
  color: '#616161',
  fontWeight: 'bold'
});

const Time = glamorous.text({
  color: '#BDBDBD',
  fontWeight: 'bold'
});

const CommentText = glamorous.text({
  marginBottom: 4
});

const Comment = ({ comment }) => (
  <Item>
    <Picture source={{ uri: getPictureUrl(comment.userProfile) }} />
    <Content>
      <Name>{comment.userName}</Name>
      <CommentText>{removeHtmlTags(comment.responseValue)}</CommentText>
      <Time>{moment(comment.lastModificationDate).calendar()}</Time>
    </Content>
  </Item>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userProfile: PropTypes.string.isRequired,
    responseValue: PropTypes.string.isRequired,
    lastModificationDate: PropTypes.number.isRequired
  }).isRequired
};

export default Comment;

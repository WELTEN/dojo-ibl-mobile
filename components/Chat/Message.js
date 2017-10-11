import React from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import { getPictureUrl } from '../../lib/Text';
import moment from 'moment';

const Item = glamorous.view({
  marginLeft: 24,
  marginRight: 24,
  maxWidth: Dimensions.get('window').width / 10 * 6,
  flexDirection: 'row'
}, ({ isCurrentUser }) => {
  if (isCurrentUser) return [{ alignSelf: 'flex-end' }];
});

const Picture = glamorous.image({
  marginRight: 12,
  width: 36,
  height: 36,
  borderRadius: 18,
  alignSelf: 'baseline'
});

const Content = glamorous.view({
  backgroundColor: '#EEEEEE'
}, ({ isCurrentUser }) => {
  if (isCurrentUser) return [{ backgroundColor: '#2196F3' }];
});

const Message = ({ isCurrentUser, message }) => (
  <Item isCurrentUser={isCurrentUser}>
    {!isCurrentUser &&
      <Picture source={{ uri: getPictureUrl(message.picture) }} />
    }
    <Content isCurrentUser={isCurrentUser}>
      <Text>{message.body}</Text>
      <Text>{moment(message.date).calendar()}</Text>
      <Text>{message.name}</Text>
    </Content>
  </Item>
);

Message.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    body: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired
};

export default Message;

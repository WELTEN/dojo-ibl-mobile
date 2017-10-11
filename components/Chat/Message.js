import React from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import { getPictureUrl } from '../../lib/Text';
import moment from 'moment';

const Item = glamorous.view({
  marginBottom: 16,
  marginLeft: 24,
  marginRight: 24,
  maxWidth: Dimensions.get('window').width / 10 * 6,
}, ({ isCurrentUser }) => {
  if (isCurrentUser) return [{ marginBottom: 4, alignSelf: 'flex-end' }];
});

const Header = glamorous.view({
  marginBottom: 4,
  flexDirection: 'row'
});

const Picture = glamorous.image({
  marginRight: 8,
  width: 22,
  height: 22,
  borderRadius: 11,
  alignSelf: 'baseline'
});

const Name = glamorous.text({
  color: '#616161',
  fontSize: 12,
  lineHeight: 22
});

const ContentContainer = glamorous.view({
  flexDirection: 'row'
});

const Content = glamorous.view({
  padding: 10,
  backgroundColor: '#EEEEEE',
  borderRadius: 28
}, ({ isCurrentUser }) => {
  if (isCurrentUser) return [{ backgroundColor: '#2196F3' }];
});

const BodyText = glamorous.text({}, ({ isCurrentUser }) => {
  if (isCurrentUser) return [{ color: 'white' }];
});

const Date = glamorous.text({
  marginTop: 4,
  color: '#BDBDBD',
  fontSize: 12
});

const Message = ({ isCurrentUser, message }) => (
  <Item isCurrentUser={isCurrentUser}>
    <Header>
      {!isCurrentUser &&
        <Picture source={{ uri: getPictureUrl(message.picture) }} />
      }
      {!isCurrentUser &&
        <Name>{message.name}</Name>
      }
    </Header>
    <ContentContainer>
      <Content isCurrentUser={isCurrentUser}>
        <BodyText isCurrentUser={isCurrentUser}>
          {message.body}
        </BodyText>
      </Content>
      <View style={{ flex: 1 }} />
    </ContentContainer>
    {!isCurrentUser &&
      <Date>{moment(message.date).calendar()}</Date>
    }
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

import React from 'react';
import { View, Text } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import moment from 'moment';

const Item = glamorous.view({
  paddingTop: 12,
  paddingBottom: 12,
  borderBottomWidth: 2,
  borderBottomColor: '#E0E0E0'
}, ({ isLast }) => {
  if (isLast) return [{ marginBottom: 8, borderBottomWidth: 0 }];
});

const Title = glamorous.text({
  color: '#757575',
  fontSize: 16,
  fontWeight: 'bold'
});

const Description = glamorous.text({
  color: '#616161'
});

const Time = glamorous.text({
  color: '#BDBDBD',
  fontWeight: 'bold'
});

const Activity = ({ activity, navigate, isLast }) => (
  <Item isLast={isLast}>
    <Title>{activity.name}</Title>
    <Description>{activity.description}</Description>
    <Time>{moment(activity.timestamp).fromNow()}</Time>
  </Item>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired
};

export default Activity;

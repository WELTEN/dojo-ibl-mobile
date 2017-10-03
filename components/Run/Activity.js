import React from 'react';
import { View, Text } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';

const Activity = ({ activity, navigate }) => (
  <View>
    <Text>{activity.name}</Text>
    <Text>{activity.description}</Text>
    <Text>{activity.timestamp}</Text>
  </View>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }).isRequired,
  navigate: PropTypes.func.isRequired
};

export default Activity;

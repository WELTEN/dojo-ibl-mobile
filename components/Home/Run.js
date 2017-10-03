import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const Run = ({ run }) => (
  <View>
    <Text>{run.title}</Text>
    <Text>{run.code}</Text>
  </View>
);

Run.propTypes = {
  run: PropTypes.shape({
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }).isRequired
};

export default Run;

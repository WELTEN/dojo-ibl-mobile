import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const RenderIfTrue = ({ expression, children }) => {
  if (expression) return children;
  else return <View />
}

RenderIfTrue.propTypes = {
  expression: PropTypes.any,
  children: PropTypes.any.isRequired
};

export default RenderIfTrue;

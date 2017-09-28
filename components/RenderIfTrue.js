import React from 'react';
import { View } from 'react-native';

const RenderIfTrue = ({ expression, children }) => {
  if (expression) return children;
  else return <View />
}

export default RenderIfTrue;

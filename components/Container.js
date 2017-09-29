import React from 'react';
import glamorous from 'glamorous-native';

const Container = glamorous.view({
  backgroundColor: 'white',
  flex: 1
}, ({ bgColor }) => {
  if (bgColor) return [{ backgroundColor: bgColor }];
});

export default Container;

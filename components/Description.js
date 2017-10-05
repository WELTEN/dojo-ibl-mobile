import React from 'react';
import { Dimensions } from 'react-native';
import glamorous from 'glamorous-native';

const width = Dimensions.get('window').width - 48;

const Description = glamorous.text({
  paddingTop: -12,
  paddingBottom: 24,
  paddingLeft: 24,
  paddingRight: 24,
  width,
  fontSize: 16
});

export default Description;

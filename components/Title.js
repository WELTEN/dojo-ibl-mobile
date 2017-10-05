import React from 'react';
import { Dimensions } from 'react-native';
import glamorous from 'glamorous-native';

const width = Dimensions.get('window').width - 48;

const Title = glamorous.text({
  paddingTop: 24,
  paddingBottom: 24,
  paddingLeft: 24,
  paddingRight: 24,
  width,
  color: '#616161',
  fontSize: 28,
  fontWeight: 'bold'
});

export default Title;

import React, { Component } from 'react';
import { Text } from 'react-native';
import glamorous from 'glamorous-native';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center'
});

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render = () => (
    <Container>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Changes you make will automatically reload.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
    </Container>
  );
}

import React, { Component } from 'react';
import { Text } from 'react-native';
import glamorous from 'glamorous-native';
import { GoogleSignin } from 'react-native-google-signin';

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
      <Text>DojoIBL</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => alert('kes')}
      />
    </Container>
  );
}

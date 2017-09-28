import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import glamorous from 'glamorous-native';

const { width, height } = Dimensions.get('window');

const Container = glamorous.view({
  flex: 1,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black'
});

const BgImage = glamorous.image({
  flex: 1,
  alignSelf: 'stretch',
  width: null,
  opacity: .6
});

const Error = glamorous.text({
  color: 'red'
});

const Title = glamorous.text({
  marginBottom: 24,
  color: 'white',
  fontSize: 36,
  backgroundColor: 'transparent'
});

const Absolute = glamorous.view({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

const Button = glamorous.touchableOpacity({
  marginBottom: 12,
  padding: 12,
  width: width - 96,
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 20
});

const GoogleButton = glamorous(Button)({
  backgroundColor: 'red'
});

const ButtonText = glamorous.text({
  fontWeight: 'bold'
});

const WhiteText = glamorous(ButtonText)({
  color: 'white'
});

const Input = glamorous.textInput({
  marginBottom: 12,
  padding: 12,
  width: width - 96,
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, .3)',
  borderRadius: 20
});

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = () => this.props.onSubmit(this.state.email, this.state.password);

  render = () => (
    <Container>
      <BgImage source={require('../images/login.jpg')} />
      <Absolute>
        <Title>DojoIBL</Title>
        <Input
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, .7)"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, .7)"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button onPress={this.onSubmit}>
          <ButtonText>Login</ButtonText>
        </Button>
        <Error>{this.props.error}</Error>
        <GoogleButton onPress={this.props.onLogin}>
          <WhiteText>Login with Google</WhiteText>
        </GoogleButton>
      </Absolute>
    </Container>
  );
}

import React, { Component } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import RenderIfTrue from './RenderIfTrue';
import Container from './Container';
import BackgroundImage from './BackgroundImage';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';

const itemWidth = Dimensions.get('window').width - 82;

const Content = glamorous.view({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

const Title = glamorous.text({
  marginBottom: 24,
  color: 'white',
  fontSize: 36,
  fontWeight: 'bold',
  backgroundColor: 'transparent'
});

const standardText = {
  fontSize: 14,
  fontWeight: 'bold'
};

const Input = glamorous.textInput(standardText, {
  marginBottom: 12,
  padding: 12,
  width: itemWidth,
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, .3)',
  borderRadius: 20
});

const WhiteText = glamorous.text(standardText, {
  color: 'white',
  backgroundColor: 'transparent'
});

const ErrorText = glamorous(WhiteText)({
  marginBottom: 12,
  width: itemWidth
});

const Button = glamorous.touchableOpacity({
  marginBottom: 12,
  padding: 12,
  width: itemWidth,
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 20
});

const GoogleButton = glamorous(Button)({
  marginTop: 12,
  backgroundColor: 'red'
});

const ButtonText = glamorous.text(standardText);

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = () => this.props.onSubmit(this.state.email, this.state.password);

  render = () => (
    <Container bgColor="black">
      <StatusBar barStyle="light-content" />
      <BackgroundImage source={require('../images/bg.jpg')} />
      <Content>
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
        <RenderIfTrue expression={this.props.error}>
          <ErrorText>{this.props.error}</ErrorText>
        </RenderIfTrue>
        <Button onPress={this.onSubmit}>
          <ButtonText>Login</ButtonText>
        </Button>
        <GoogleButton onPress={this.props.onLogin}>
          <WhiteText>Login with Google</WhiteText>
        </GoogleButton>
      </Content>
    </Container>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};
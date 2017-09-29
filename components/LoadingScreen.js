import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import Container from './Container';
import BackgroundImage from './BackgroundImage';
import glamorous from 'glamorous-native';

const LoadingSpinner = glamorous.view({
  position: 'absolute',
  width: '100%',
  height: '100%',
  justifyContent: 'center'
});

const LoadingScreen = () => (
  <Container bgColor="black">
    <StatusBar barStyle="light-content" />
    <BackgroundImage source={require('../images/bg.jpg')} />
    <LoadingSpinner>
      <ActivityIndicator
        animating
        color="white"
        size="large"
      />
    </LoadingSpinner>
  </Container>
);

export default LoadingScreen;

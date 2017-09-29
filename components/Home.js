import React from 'react';
import { Image, Text, TouchableHighlight } from 'react-native';
import glamorous from 'glamorous-native';
import Container from './Container';
import UserHeader from './Home/UserHeader';

const Home = ({ user, onLogout }) => (
  <Container>
    <UserHeader user={user} />
    <TouchableHighlight onPress={onLogout}>
      <Text>Logout</Text>
    </TouchableHighlight>
  </Container>
);

export default Home;

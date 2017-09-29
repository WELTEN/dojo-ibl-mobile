import React from 'react';
import { Image, Text, TouchableHighlight, StatusBar } from 'react-native';
import glamorous from 'glamorous-native';
import Container from './Container';
import UserHeader from './Home/UserHeader';
import PropTypes from 'prop-types';

const Home = ({ user, onLogout }) => (
  <Container>
    <StatusBar barStyle="light-content" />
    <UserHeader user={user} onLogout={onLogout} />
  </Container>
);

Home.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Home;

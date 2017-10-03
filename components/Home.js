import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import glamorous from 'glamorous-native';
import Container from './Container';
import UserHeader from './Home/UserHeader';
import RunList from './Home/RunList';
import PropTypes from 'prop-types';

const Title = glamorous.text({
  marginTop: 12,
  marginBottom: 12,
  marginLeft: 24,
  marginRight: 24,
  fontSize: 28,
  fontWeight: 'bold'
});

const Home = ({ user, token, onLogout, navigate }) => (
  <Container>
    <StatusBar barStyle="light-content" />
    <UserHeader user={user} onLogout={onLogout} />
    <Title>Inquiries</Title>
    <RunList token={token} navigate={navigate} />
  </Container>
);

Home.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

export default Home;

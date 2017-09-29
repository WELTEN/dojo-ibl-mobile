import React from 'react';
import { Dimensions, View, Image, Text } from 'react-native';
import glamorous from 'glamorous-native';

const width = Dimensions.get('window').width;

const Header = glamorous.view({
  paddingTop: 50,
  paddingBottom: 38,
  paddingLeft: 24,
  paddingRight: 24,
  width,
  backgroundColor: 'black',
  alignItems: 'center',
  flexDirection: 'row'
});

const BackgroundImage = glamorous.image({
  position: 'absolute',
  top: 0,
  left: 0,
  width,
  height: 144,
  opacity: .6
});

const LogoutButton = glamorous.touchableOpacity({
  position: 'absolute',
  top: 36,
  right: 24
});

const LogoutIcon = glamorous.image({
  width: 16,
  height: 16
});

const Picture = glamorous.image({
  marginRight: 18,
  width: 56,
  height: 56,
  borderRadius: 24
});

const Name = glamorous.text({
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  backgroundColor: 'transparent'
});

const Email = glamorous.text({
  color: 'rgba(255, 255, 255, .7)',
  fontSize: 14,
  fontWeight: 'bold',
  backgroundColor: 'transparent'
});

const UserHeader = ({ user, onLogout }) => (
  <Header>
    <BackgroundImage source={require('../../images/bg.jpg')} />
    <LogoutButton onPress={onLogout}>
      <LogoutIcon source={require('../../images/logout.png')} />
    </LogoutButton>
    <Picture source={{ uri: user.photo }} />
    <View>
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
    </View>
  </Header>
);

export default UserHeader;

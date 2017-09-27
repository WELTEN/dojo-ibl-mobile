import React, { PureComponent } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import ProfileHeader from './ProfileHeader';

export default class ProfilePage extends PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Profile'
  };

  shouldComponentUpdate() { return false; }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#2F4050'}}>
        <ProfileHeader tokens={this.props.screenProps.tokens} />
        <TouchableOpacity onPress={this.props.screenProps.logout}>
          <Text style={globalStyles.fullWidthBtn}>Logout</Text>
        </TouchableOpacity>
        <Text style={globalStyles.title}>Upcoming activities</Text>
      </ScrollView>
    );
  }
}

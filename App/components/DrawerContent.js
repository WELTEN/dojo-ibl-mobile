import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={styles.drawerContent}>
        <TouchableHighlight onPress={() => this.props.navigate('AddInquiry')}>
          <Text style={styles.drawerText}>Add inquiry</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigate('AllInquiries')}>
          <Text style={styles.drawerText}>All inquiries</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    padding: 10,
    width: sizes.window.width * 0.8,
    height: sizes.window.height,
    backgroundColor: colors.textColor
  },
  drawerText: {
    color: colors.backgroundColor,
    fontSize: 16
  }
});

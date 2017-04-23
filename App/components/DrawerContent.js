import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={styles.drawerContent}>
        <Text style={styles.drawerText}>Drawer</Text>
        <Text style={styles.drawerText}>Drawer2</Text>
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
    color: colors.backgroundColor
  }
});

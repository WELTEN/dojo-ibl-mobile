import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

export default function LoadingPage(props) {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator
        animating={true}
        color={colors.textColor}
        size="large"
      />
    </View>
  );
}

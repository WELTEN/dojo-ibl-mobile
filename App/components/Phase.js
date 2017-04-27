import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

export default class Phase extends Component {
  render() {
    return (
      <View style={styles.phase}>
        <Text style={styles.phaseTitle}>{this.props.phase.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  phase: {
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(255, 255, 255, .8)'
  },
  phaseTitle: {
    fontSize: 18
  }
});

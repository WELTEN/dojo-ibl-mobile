import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Utils from '../lib/Utils';
import RequestUtils from '../lib/RequestUtils';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import ChatForm from '../components/ChatForm';

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.groupName} chat`
  });

  runId = this.props.navigation.state.params.runId;
  tokens = this.props.navigation.state.params.tokens;

  render() {
    return (
      <InvertibleScrollView
        inverted
        style={styles.container}
      >
        <ChatForm />
        <View style={{flex: 1}}>
          {new Array(1000).fill('message').map((message) => {
            const randomNum = Math.round(Math.random() * 10);
            const style = randomNum == 5
                          ? StyleSheet.flatten([styles.message, styles.currentUserMessage])
                          : styles.message;

            const textStyle = randomNum == 5 ? { color: colors.textColor } : {};

            return (
              <View style={style}>
                <Text style={textStyle}>{message}</Text>
              </View>
            );
          })}
        </View>
      </InvertibleScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: sizes.offset / 2,
    paddingRight: sizes.offset / 2,
    backgroundColor: colors.backgroundColor
  },
  message: {
    marginBottom: sizes.offset / 2,
    padding: sizes.offset / 2,
    width: sizes.window.width * 0.7,
    backgroundColor: colors.textColor,
    borderRadius: sizes.offset / 2
  },
  currentUserMessage: {
    marginLeft: sizes.window.width * 0.3 - sizes.offset,
    backgroundColor: colors.secondaryTextColor
  }
});

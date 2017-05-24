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

export default function MessageListItem(props) {
  const isCurrentUser = props.currentUser.localId == props.message.senderId;
  const style = isCurrentUser
                ? StyleSheet.flatten([styles.message, styles.currentUserMessage])
                : styles.message

  const textStyle = isCurrentUser ? { color: colors.textColor } : {}

  console.log(props.message.senderId)
  console.log(isCurrentUser)
  console.log(style)

  console.log(`${props.message.senderId} sent this message: ${props.message.body}, is it the current user? ${isCurrentUser}. Current user = ${props.currentUser.localId}`)

  return (
    <View style={style}>
      <Text style={textStyle}>{props.message.body}</Text>
    </View>
  );
}

const styles = {
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
}

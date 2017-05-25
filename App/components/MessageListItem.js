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
                : styles.message;

  const textStyle = isCurrentUser ? { color: colors.textColor } : {};
  const dateStyle = isCurrentUser
                    ? StyleSheet.flatten([styles.messageDate, styles.currentUserMessageDate])
                    : styles.messageDate;

  const date = new Date(props.message.date);

  let hours = date.getHours();
  let ampm = hours < 12 ? 'AM' : 'PM';
  if (ampm == 'PM') hours = hours - 12;
  let minutes = date.getMinutes();
  if (minutes.toString().length == 1) minutes = '0' + minutes;

  const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes} ${ampm}`;

  return (
    <View>
      <View style={style}>
        { !isCurrentUser &&
          <Text style={styles.messageUsername}>{props.message.senderId}</Text>
        }
        <Text style={textStyle}>{props.message.body}</Text>
      </View>
      <Text style={dateStyle}>{dateString}</Text>
    </View>
  );
}

const styles = {
  message: {
    padding: sizes.offset / 2,
    paddingTop: sizes.offset / 4,
    width: sizes.window.width * 0.7,
    backgroundColor: colors.textColor,
    borderRadius: sizes.offset / 2
  },
  currentUserMessage: {
    marginLeft: sizes.window.width * 0.3 - sizes.offset,
    paddingTop: sizes.offset / 2,
    backgroundColor: colors.secondaryTextColor
  },
  messageUsername: {
    marginBottom: sizes.offset / 4,
    color: colors.backgroundColor
  },
  messageDate: {
    marginTop: sizes.offset / 4,
    marginBottom: sizes.offset / 4 * 3,
    color: `rgba(${colors.textColorRgb}, .7)`
  },
  currentUserMessageDate: {
    textAlign: 'right'
  }
}

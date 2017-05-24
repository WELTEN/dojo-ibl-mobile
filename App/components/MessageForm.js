import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { sizes } from '../styles/sizes';
import { colors } from '../styles/colors';
import RequestUtils from '../lib/RequestUtils';

export default class ChatForm extends Component {
  state = { text: '' };

  handleSendButton = () => {
    if (!this.state.text.trim()) return;

    RequestUtils.requestWithToken(`messages/thread/runId/${this.props.runId}/default`, this.props.tokens)
      .then((thread) => {
        return {
          body: this.state.text,
          date: Date.now(),
          deleted: false,
          runId: this.props.runId,
          senderId: this.props.currentUser.localId,
          senderProviderId: 5,
          subject: 'empty',
          threadId: thread.threadId
        };
      })
      .then((messageJson) => {
        this.setState({ text: '' });

        return fetch(`https://dojo-ibl.appspot.com/rest/messages/message`, {
            method: 'post',
            headers: {
              'Authorization': `GoogleLogin auth=${this.props.tokens.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageJson)
          })
      })
      .then((response) => response.json())
      .then((savedMessage) => {
        this.props.addNewMessage(savedMessage);

        console.log(savedMessage);
      });

  }

  render() {
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
          placeholder="Type your message here..."
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={this.handleSendButton}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    marginLeft: -sizes.offset / 2,
    marginRight: -sizes.offset / 2,
    width: sizes.window.width,
    flex: 1,
    flexDirection: 'row'
  },
  textInput: {
    flex: 3,
    paddingLeft: sizes.offset / 2,
    paddingRight: sizes.offset / 2,
    height: sizes.offset * 2,
    backgroundColor: colors.textColor
  },
  sendButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes.offset * 2,
    backgroundColor: colors.secondaryTextColor
  },
  sendButtonText: {
    color: colors.textColor
  }
});

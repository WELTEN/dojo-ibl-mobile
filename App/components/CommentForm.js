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

export default class CommentForm extends Component {
  state = { text: '' };

  handleSendButton = () => {
    if (!this.state.text.trim()) return;

    const responseJson = {
      runId: this.props.runId,
      generalItemId: this.props.itemId,
      userEmail: '5:rafaelklaessen',
      responseValue: this.state.text,
      lastModificationDate: Date.now(),
      revoked: false,
      parentId: 0,
      nestedResponses: []
    };

    console.log(responseJson);

    this.setState({ text: '' });

    fetch(`https://dojo-ibl.appspot.com/rest/response`, {
        method: 'post',
        headers: {
          'Authorization': `GoogleLogin auth=${this.props.tokens.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseJson)
      })
      .then((response) => response.json())
      .then((savedResponse) => {
        this.props.addNewComment(savedResponse);

        console.log(savedResponse);
      });
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
          placeholder="Reply to this activity..."
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

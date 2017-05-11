import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { sizes } from '../styles/sizes';
import { colors } from '../styles/colors';

export default class CommentForm extends Component {
  state = { text: '' };

  handleSendButton = () => {
    console.log('Click!');
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight
          style={styles.sendButton}
          onPress={this.handleSendButton}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: sizes.offset
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

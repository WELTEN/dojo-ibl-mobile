import React, { Component } from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import MessageList from './Chat/MessageList';
import MessageForm from './Chat/MessageForm';

const style = {
  backgroundColor: 'white',
  flex: 1
};

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat: ${navigation.state.params.run.title}`
  });

  render() {
    const { user, run } = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView
        style={style}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <StatusBar barStyle="dark-content" />
        <MessageList user={user} runId={run.runId} />
        <MessageForm user={user} runId={run.runId} />
      </KeyboardAvoidingView>
    );
  }
}

Chat.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.object.isRequired,
        run: PropTypes.shape({
          runId: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  })
};

import React, { Component } from 'react';
import {
  AsyncStorage,
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
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.groupName} chat`
  });

  runId = this.props.navigation.state.params.runId;
  tokens = this.props.navigation.state.params.tokens;

  state = {
    animating: true,
    currentUser: {},
    messages: []
  };

  requestRunning = false;
  resumptionToken = '';

  messages = {};

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages() {
    this.setState({ animating: true });
    AsyncStorage.getItem('profile').then((profileData) => {
      if (profileData != null && typeof profileData != 'undefined') {
        this.setState({
          currentUser: JSON.parse(profileData)
        });
      }
    })

    AsyncStorage.getItem('messages').then((messages) => {
        if (messages != null && typeof messages != 'undefined') {
          messages = JSON.parse(messages);
          this.messages = messages;

          if (typeof messages[this.runId] != 'undefined') {
            this.setState({
              messages: messages[this.runId]
            });
          }
        }

        this.loadMessagesFromServer(true);
      });
  }

  loadMessagesFromServer(isInitialRequest = false) {
    this.setState({ animating: true });
    this.requestRunning = true;

    const resumptionTokenParam = this.resumptionToken
                                 ? `&resumptionToken=${this.resumptionToken}`
                                 : '';

    RequestUtils.requestWithToken(`messages/runId/${this.runId}/default?from=0${resumptionTokenParam}`, this.tokens)
      .then((messageList) => {
        console.log(messageList)
        this.requestRunning = false;
        this.resumptionToken = messageList.resumptionToken;

        let newMessages = [];
        if (isInitialRequest) {
          newMessages = messageList.messages.reverse();
        } else {
          newMessages = messageList.messages.reverse().concat(this.state.messages);
        }

        this.setState({
          messages: newMessages
        });

        if (isInitialRequest || typeof this.messages[this.runId] == 'undefined') {
          this.messages[this.runId] = messageList.messages;
          AsyncStorage.setItem('messages', JSON.stringify(this.messages));
        }

        this.setState({
          animating: false
        });
      })
  }

  onEndReached() {
    if (!this.requestRunning && typeof this.resumptionToken != 'undefined') {
      this.loadMessagesFromServer();
    }
   }

  addNewMessage = (newMessage) => {
    const messages = this.state.messages;
    messages.push(newMessage);
    this.setState({
      messages: messages
    });
  }

  render() {
    return (
      <InvertibleScrollView
        inverted
        style={styles.container}
        keyboardShouldPersistTaps="always"
        onScroll={(e) => {
          const windowHeight = sizes.window.height;
          const height = e.nativeEvent.contentSize.height;
          const offsetTop = e.nativeEvent.contentOffset.y;
          if (windowHeight + offsetTop >= height - (windowHeight / 2)) {
            this.onEndReached();
          }
        }}
        scrollEventThrottle={0}
      >
        <MessageForm
          addNewMessage={this.addNewMessage}
          runId={this.runId}
          tokens={this.tokens}
          currentUser={this.state.currentUser}
        />
        <MessageList
          messages={this.state.messages}
          currentUser={this.state.currentUser}
        />
      </InvertibleScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: sizes.offset / 2,
    paddingRight: sizes.offset / 2,
    backgroundColor: colors.backgroundColor
  }
});

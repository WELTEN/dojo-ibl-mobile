import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FirebaseList from '../FirebaseList';
import Message from './Message';

const MessageList = ({ runId }) => (
  <FirebaseList
    firebaseRef={`messages/${runId}`}
    renderItem={message => <Message message={message} />}
  />
);

MessageList.propTypes = {
  runId: PropTypes.number.isRequired
};

export default MessageList;

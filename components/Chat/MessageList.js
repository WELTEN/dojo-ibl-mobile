import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FirebaseList from '../FirebaseList';
import Message from './Message';

const MessageList = ({ user, runId }) => (
  <FirebaseList
    firebaseRef={`messages/${runId}`}
    renderItem={(message) =>
      <Message
        isCurrentUser={message.name == user.displayName}
        message={message}
      />
    }
  />
);

MessageList.propTypes = {
  user: PropTypes.object.isRequired,
  runId: PropTypes.number.isRequired
};

export default MessageList;

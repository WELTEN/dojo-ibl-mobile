import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import * as firebase from 'firebase';
import { getFirebaseRef, flattenFirebaseList } from '../../lib/Firebase';

export default class MessageForm extends Component {
  getCommentsRef = () =>
    getFirebaseRef(`messages/${this.props.runId}`);

  onSend = (message) => {
    this.getCommentsRef().push().set({
      body: message,
      date: Date.now(),
      localId: this.props.user.uid,
      name: this.props.user.displayName,
      picture: this.props.user.photoURL || '/src/assets/img/avatar5.png'
    });
  }

  render = () => (
    <Form placeholder="Type a message here" onSend={this.onSend} />
  );
}

MessageForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoUrl: PropTypes.any
  }).isRequired,
  runId: PropTypes.number.isRequired
};

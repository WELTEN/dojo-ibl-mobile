import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import * as firebase from 'firebase';
import { getFirebaseRef, flattenFirebaseList } from '../../lib/Firebase';

export default class CommentForm extends Component {
  getCommentsRef = () =>
    getFirebaseRef(`responses/${this.props.runId}/${this.props.activity.id}`);

  onSend = (comment) => {
    this.getCommentsRef().push().set({
      deleted: false,
      generalItemId: this.props.activity.id.toString(),
      generalItemName: this.props.activity.name,
      lastModificationDate: Date.now(),
      likeCount: 0,
      parentId: 0,
      responseValue: `<p>${comment}</p>`,
      revoked: false,
      runId: this.props.runId.toString(),
      type: 'org.celstec.arlearn2.beans.run.Response',
      userAccountType: 7,
      userLocalId: this.props.user.uid,
      userName: this.props.user.displayName,
      userProfile: this.props.user.photoURL || '/src/assets/img/avatar5.png'
    });
  }

  render = () => (
    <Form placeholder="Type a comment here" onSend={this.onSend} />
  );
}

CommentForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoUrl: PropTypes.any
  }).isRequired,
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  runId: PropTypes.number.isRequired
};

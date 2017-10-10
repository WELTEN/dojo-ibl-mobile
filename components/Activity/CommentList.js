import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FirebaseList from '../FirebaseList';
import Comment from './Comment';

const CommentList = ({ runId, activity }) => (
  <FirebaseList
    firebaseRef={`responses/${runId}/${activity.id}`}
    renderItem={comment => <Comment comment={comment} />}
  />
);

CommentList.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  runId: PropTypes.number.isRequired
};

export default CommentList;

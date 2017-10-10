import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { getFirebaseRef, flattenFirebaseList } from '../../lib/Firebase';
import Comment from './Comment';

export default class CommentList extends Component {
  state = {
    comments: [],
    loading: true
  };

  componentDidMount = this.getComments;

  getCommentsRef = () =>
    getFirebaseRef(`responses/${this.props.runId}/${this.props.activity.id}`);

  getComments() {
    this.getCommentsRef().on('value', (snapshot) => {
      const comments = snapshot.val();
      this.setState({ comments, loading: false });
    });
  }

  componentWillUnmount = () => this.getCommentsRef().off();

  render = () => (
    <FlatList
      inverted
      data={flattenFirebaseList(this.state.comments).reverse()}
      keyExtractor={comment => comment.key}
      renderItem={({ item }) => <Comment comment={item} />}
      refreshing={this.state.loading}
    />
  );
}

CommentList.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  runId: PropTypes.number.isRequired
};

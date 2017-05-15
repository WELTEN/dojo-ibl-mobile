import React, { Component } from 'react';
import {
  AsyncStorage,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Utils from '../lib/Utils';
import RequestUtils from '../lib/RequestUtils';

export default class Activity extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.activity.name
  });

  state = { comments: [] };

  activity = this.props.navigation.state.params.activity;
  runId = this.props.navigation.state.params.runId
  tokens = this.props.navigation.state.params.tokens;

  requestRunning = false;
  resumptionToken = '';

  comments = {};
  commentsKey = `${this.runId}:${this.activity.id}`;

  componentDidMount() {
    this.loadComments();
  }

  loadComments() {
    AsyncStorage.getItem('comments').then((comments) => {
        if (comments != null && typeof comments != 'undefined') {
          comments = JSON.parse(comments);
          this.comments = comments;

          if (typeof comments[this.commentsKey] != 'undefined') {
            this.setState({
              comments: comments[this.commentsKey]
            });
          }
        }

        this.loadCommentsFromServer(true);
      });
  }

  loadCommentsFromServer(isInitialRequest = false) {
    this.requestRunning = true;

    const resumptionTokenParam = this.resumptionToken ? `&resumptionToken=${this.resumptionToken}` : '';
    RequestUtils.requestWithToken(`response/runId/${this.runId}/itemId/${this.activity.id}?from=0${resumptionTokenParam}`, this.tokens)
      .then((responseList) => {
        this.requestRunning = false;
        this.resumptionToken = responseList.resumptionToken;

        let newComments = [];
        if (isInitialRequest) {
          newComments = responseList.responses;
        } else {
          newComments = this.state.comments.concat(responseList.responses);
        }

        this.setState({
          comments: newComments
        });

        if (isInitialRequest || typeof this.comments[this.commentsKey] == 'undefined') {
          this.comments[this.commentsKey] = responseList.responses;
          AsyncStorage.setItem('comments', JSON.stringify(this.comments));
        }
      });
  }

  onEndReached() {
    if (!this.requestRunning && typeof this.resumptionToken != 'undefined') {
      console.log('Loading comments');
      this.loadCommentsFromServer();
    }
  }

  addNewComment = (newComment) => {
    this.setState({
      comments: this.state.comments.concat(newComment)
    });
  }

  render() {
    return (
      <ScrollView
        style={globalStyles.containerScrollView}
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
        <Text style={globalStyles.title}>{this.activity.name}</Text>
        {this.activity.richText &&
          <Text style={globalStyles.leftText}>
            {Utils.removeHtmlTagsFromString(this.activity.richText)}
          </Text>
        }
        <CommentList
          comments={this.state.comments}
          tokens={this.tokens}
          addNewComment={this.addNewComment}
        />
        <CommentForm
          runId={this.runId}
          itemId={this.activity.id}
          tokens={this.tokens}
          addNewComment={this.addNewComment}
        />
      </ScrollView>
    );
  }
}

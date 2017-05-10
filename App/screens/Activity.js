import React, { Component } from 'react';
import {
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

  componentDidMount() {
    this.loadComments();
  }

  loadComments() {
    this.requestRunning = true;

    const resumptionTokenParam = this.resumptionToken ? `&resumptionToken=${this.resumptionToken}` : '';
    RequestUtils.requestWithToken(`response/runId/${this.runId}/itemId/${this.activity.id}?from=0${resumptionTokenParam}`, this.tokens)
      .then((responseList) => {
        this.requestRunning = false;
        this.resumptionToken = responseList.resumptionToken;
        this.setState({
          comments: this.state.comments.concat(responseList.responses)
        });

        console.log(responseList);
      });
  }

  onEndReached() {
    if (!this.requestRunning && typeof this.resumptionToken != 'undefined') {
      console.log('Loading comments');
      this.loadComments();
    }
  }

  render() {
    return (
      <ScrollView
        style={globalStyles.containerScrollView}
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
        <CommentList comments={this.state.comments} />
      </ScrollView>
    );
  }
}

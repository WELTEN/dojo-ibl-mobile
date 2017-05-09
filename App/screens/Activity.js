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

export default class Activity extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.activity.name
  });

  state = { comments: [] };

  activity = this.props.navigation.state.params.activity;
  runId = this.props.navigation.state.params.runId
  tokens = this.props.navigation.state.params.tokens;

  componentDidMount() {
    this.loadResponses();
  }

  loadResponses() {
    fetch(`https://dojo-ibl.appspot.com/rest/response/runId/${this.runId}/itemId/${this.activity.id}`, {
        method: 'get',
        headers: {
          'Authorization': `GoogleLogin auth=${this.tokens.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          comments: json.responses
        });

        console.log(json);
      });
  }

  render() {
    return (
      <ScrollView style={globalStyles.containerScrollView}>
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

import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import { getTokenFromStorage } from '../lib/Storage';
import { requestWithToken } from '../lib/Requests';

export default class Activity extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.activity.name
  });

  state = {
    comments: [],
    requestRunning: true
  };

  resumptionToken = null

  componentDidMount = this.getComments;

  getComments() {
    this.setState({
      requestRunning: true
    });

    const { activity, runId } = this.props.navigation.state.params;
    const resumptionTokenParam = this.resumptionToken ? `&resumptionToken=${this.resumptionToken}` : '';
    console.log('eh')
    getTokenFromStorage().then((token) =>
      requestWithToken(`response/runId/${runId}/itemId/${activity.id}?from=0${resumptionTokenParam}`, token)
    ).then((responseList) => {
      console.log('request done')
      console.log(responseList)
      this.resumptionToken = responseList.resumptionToken;

      const comments = this.state.comments.concat(responseList.responses);
      this.setState({ comments, requestRunning: false });
    });
  }

  render() {
    console.log(this.props.navigation.state.params.activity)
    console.log(this.state.comments)
    return (
      <FlatList
        data={this.state.comments}
        keyExtractor={activity => activity.id}
        renderItem={({ item }) => (
          <Text>{JSON.stringify(item)}</Text>
        )}
        refreshing={this.state.requestRunning}
        onRefresh={() => {}}
      />
    );
  }
}

Activity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        activity: PropTypes.shape({
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          timestamp: PropTypes.number.isRequired
        }).isRequired,
        runId: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  })
};

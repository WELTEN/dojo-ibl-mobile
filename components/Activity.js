import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import { getTokenFromStorage } from '../lib/Storage';
import { requestWithToken } from '../lib/Requests';
import * as firebase from 'firebase';
import { firebaseListener, flattenFirebaseList } from '../lib/Firebase';
import Container from './Container';
import Title from './Title';
import Description from './Description';

const PhaseTitle = glamorous.text({ color: '#BDBDBD', paddingRight: 1000 });
const LineBreak = glamorous.view({ width: '100%', height: 0 });

export default class Activity extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.activity.name
  });

  state = {
    comments: [],
    loading: true
  };

  resumptionToken = null

  componentDidMount = this.getComments;

  getComments() {
    const { activity, runId } = this.props.navigation.state.params;
    firebaseListener(`responses/${runId}/${activity.id}`, (comments) => {
      this.setState({ comments, loading: false });
    });
  }

  render() {
    const { activity, phaseTitle } = this.props.navigation.state.params;
    const comments = flattenFirebaseList(this.state.comments);
    console.log(activity)

    return (
      <Container>
        <Title>
          <PhaseTitle>{phaseTitle} / </PhaseTitle>
          <LineBreak />
          {activity.name}
        </Title>
        {activity.description &&
          <Description>{activity.description}</Description>
        }
        <FlatList
          data={flattenFirebaseList(this.state.comments)}
          keyExtractor={comment => comment.key}
          renderItem={({ item }) => (
            <Text>{JSON.stringify(item)}</Text>
          )}
          refreshing={this.state.loading}
          onRefresh={() => {}}
        />
      </Container>
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
        runId: PropTypes.number.isRequired,
        phaseTitle: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  })
};

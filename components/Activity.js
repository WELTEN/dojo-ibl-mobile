import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import Title from './Title';
import Description from './Description';
import CommentList from './Activity/CommentList';
import CommentForm from './Activity/CommentForm';

const style = {
  backgroundColor: 'white',
  flex: 1
};

const PhaseTitle = glamorous.text({ color: '#BDBDBD', paddingRight: 1000 });
const LineBreak = glamorous.view({ width: '100%', height: 0 });

export default class Activity extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.activity.name
  });

  render() {
    const { activity, runId, phaseTitle } = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView style={style} behavior="padding" keyboardVerticalOffset={64}>
        <Title>
          <PhaseTitle>{phaseTitle} /</PhaseTitle>
          <LineBreak />
          {activity.name}
        </Title>
        {activity.description &&
          <Description>{activity.description}</Description>
        }
        <CommentList activity={activity} runId={runId} />
        <CommentForm activity={activity} runId={runId} />
      </KeyboardAvoidingView>
    );
  }
}

Activity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        activity: PropTypes.shape({
          id: PropTypes.number.isRequired,
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

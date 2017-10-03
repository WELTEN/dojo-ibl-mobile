import React, { Component } from 'react';
import { View } from 'react-native';
import Run from './Run';
import PropTypes from 'prop-types';

export default class RunList extends Component {
  state = {
    runs: []
  };

  componentDidMount() {
    fetch('https://dojo-ibl.appspot.com/rest/myRuns/participate/', {
        method: 'GET',
        headers: {
          'Authorization': this.props.token
        }
      })
      .then(response => response.json())
      .then(({ runs }) => {
        runs = runs.filter(run => !run.deleted)
        this.setState({ runs });
      });
  }

  render = () => (
    <View>
      {this.state.runs.map((run) => (
        <Run run={run} key={run.runId} />
      ))}
    </View>
  );
}

RunList.propTypes = {
  token: PropTypes.string.isRequired
};

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Run from './Run';
import PropTypes from 'prop-types';
import { requestWithToken } from '../../lib/Requests';

export default class RunList extends Component {
  state = {
    runs: [],
    refreshing: true
  };

  componentDidMount = this.getRuns;

  getRuns() {
    requestWithToken('myRuns/participate', this.props.token).then(({ runs }) => {
      runs = runs.filter(run => !run.deleted)
      this.setState({ runs, refreshing: false });
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getRuns();
  }

  render = () => (
    <FlatList
      data={this.state.runs}
      keyExtractor={run => run.runId}
      renderItem={({ item }) => (
        <Run run={item} navigate={this.props.navigate} />
      )}
      onRefresh={this.onRefresh}
      refreshing={this.state.refreshing}
    />
  );
}

RunList.propTypes = {
  token: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired
};

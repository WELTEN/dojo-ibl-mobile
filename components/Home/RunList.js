import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Run from './Run';
import RunForm from './RunForm';
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
    <View>
      <FlatList
        data={this.state.runs}
        keyExtractor={run => run.runId}
        renderItem={({ item }) => (
          <Run user={this.props.user} run={item} navigate={this.props.navigate} />
        )}
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        ListFooterComponent={
          <View>
            <RunForm
              user={this.props.user}
              token={this.props.token}
              onRefresh={this.onRefresh}
            />
            <View style={{ height: 200 }} />
          </View>
        }
      />
    </View>
  );
}

RunList.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired
};

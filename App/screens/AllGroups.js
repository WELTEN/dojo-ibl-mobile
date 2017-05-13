import React, { PureComponent } from 'react';
import {
  AsyncStorage,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Auth from '../lib/Auth';
import RequestUtils from '../lib/RequestUtils';
import AllGroupsList from '../components/AllGroupsList';

export default class AllGroups extends PureComponent {
  static navigationOptions = {
    tabBarLabel: 'All groups'
  };

  state = {
    refreshing: false,
    groups: [],
    // Store the serverTime to determine whether the component should rerender
    // or not
    serverTime: 0
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.refreshing != nextState.refreshing ||
           this.state.serverTime != nextState.serverTime;
  }

  componentDidMount() {
    this.loadGroups();
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });

    this.loadGroupsFromServer(this.props.screenProps.tokens);
  }

  loadGroups() {
    AsyncStorage.getItem('groups').then((groups) => {
        if (groups != null && typeof groups != 'undefined') {
          this.setState({
            groups: JSON.parse(groups),
            serverTime: 1
          });
        }

        this.loadGroupsFromServer(this.props.screenProps.tokens);
      });
  }

  loadGroupsFromServer(tokens) {
    RequestUtils.requestWithToken('myRuns/participate', tokens)
      .then((runList) => {
        this.setState({
          refreshing: false,
          groups: runList.runs,
          serverTime: runList.serverTime
        });

        AsyncStorage.setItem('groups', JSON.stringify(runList.runs));
        console.log(runList);
      });
  }

  render() {
    return (
      <ScrollView
        style={globalStyles.containerScrollView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <Text style={globalStyles.title}>All groups</Text>
        <AllGroupsList
          navigate={this.props.screenProps.navigate}
          tokens={this.props.screenProps.tokens}
          groups={this.state.groups}
        />
      </ScrollView>
    );
  }
}

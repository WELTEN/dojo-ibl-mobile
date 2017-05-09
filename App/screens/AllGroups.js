import React, { PureComponent } from 'react';
import {
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
    this.loadGroups(this.props.screenProps.tokens);
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });

    this.loadGroups(this.props.screenProps.tokens);
  }

  loadGroups(tokens) {
    fetch('https://dojo-ibl.appspot.com/rest/myRuns/participate', {
        method: 'get',
        headers: {
          'Authorization': `GoogleLogin auth=${tokens.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          refreshing: false,
          groups: json.runs,
          serverTime: json.serverTime
        });

        console.log(json);
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

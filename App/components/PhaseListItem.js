import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import ActivityList from './ActivityList';
import RequestUtils from '../lib/RequestUtils';

export default class PhaseListItem extends Component {
  state = { activities: {} };

  componentDidMount() {
    this.loadActivities();
  }

  loadActivities() {
    RequestUtils.requestWithToken(`generalItems/gameId/${this.props.gameId}/section/${this.props.index}`, this.props.tokens)
      .then((generalItemList) => {
        this.setState({
          activities: generalItemList
        });

        console.log(generalItemList);
      });
  }

  render() {
    return (
      <View style={styles.phase}>
        <Text style={styles.phaseTitle}>{this.props.phase.title}</Text>
        <ActivityList
          activities={this.state.activities}
          navigate={this.props.navigate}
          tokens={this.props.tokens}
          runId={this.props.runId}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  phase: {
    marginBottom: sizes.offset / 2,
    paddingTop: sizes.offset / 2,
    paddingBottom: sizes.offset / 2,
    paddingLeft: sizes.offset,
    paddingRight: sizes.offset,
    backgroundColor: `rgba(${colors.textColorRgb}, .8)`
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: '300'
  }
});

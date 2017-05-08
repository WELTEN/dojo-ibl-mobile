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

export default class PhaseListItem extends Component {
  state = { activities: {} };

  componentDidMount() {
    this.loadActivities();
  }

  loadActivities() {
    fetch(`https://dojo-ibl.appspot.com/rest/generalItems/gameId/${this.props.gameId}/section/${this.props.index}`, {
        method: 'get',
        headers: {
          'Authorization': `GoogleLogin auth=${this.props.tokens.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          activities: json
        });

        console.log(json);
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  phase: {
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: `rgba(${colors.textColorRgb}, .8)`
  },
  phaseTitle: {
    marginBottom: sizes.offset / 2,
    fontSize: 18,
    fontWeight: '300'
  }
});

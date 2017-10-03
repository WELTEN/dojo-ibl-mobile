import React, { Component } from 'react';
import { Text, FlatList, View } from 'react-native';
import { getTokenFromStorage } from '../../lib/Storage';
import PropTypes from 'prop-types';
import glamorous from 'glamorous-native';
import { requestWithToken } from '../../lib/Requests';
import Activity from './Activity';

const Item = glamorous.view({
  marginLeft: 24,
  marginRight: 24
});

const Title = glamorous.text({
  fontSize: 20,
  fontWeight: 'bold'
});

export default class Phase extends Component {
  state = {
    activities: [],
    refreshing: true
  };

  componentDidMount = this.getActivities;

  getActivities() {
    getTokenFromStorage().then((token) =>
      requestWithToken(`generalItems/gameId/${this.props.gameId}/section/${this.props.index}`, token)
    ).then(({ generalItems }) => {
      generalItems.filter(item => !item.deleted);
      this.setState({ activities: generalItems, refreshing: false });
    });
  }

  render = () => (
    <Item>
      <Title>{this.props.phase.title}</Title>
      <FlatList
        data={this.state.activities}
        keyExtractor={(activity) => activity.id}
        renderItem={({ item, index }) => (
          <Activity
            activity={item}
            navigate={this.props.navigate}
            isLast={index == this.state.activities.length - 1}
          />
        )}
        refreshing={this.state.refreshing}
      />
    </Item>
  );
}

Phase.propTypes = {
  gameId: PropTypes.number.isRequired,
  phase: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired
};

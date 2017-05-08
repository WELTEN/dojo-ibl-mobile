import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Auth from '../lib/Auth';
import GroupListItem from './GroupListItem';

export default class AllGroupsList extends Component {
  state = {
    groups: []
  };

  componentDidMount() {
    this.loadGroups(this.props.tokens);
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
          groups: json.runs
        });

        console.log(json);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.groups}
          renderItem={({item}) =>
            <GroupListItem
              group={item}
              onPress={() => this.props.navigate('Group', { group: item })}
            />
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: sizes.offset,
    marginRight: sizes.offset
  }
});

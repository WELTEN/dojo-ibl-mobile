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

export default function AllGroupsList(props) {
  return (
    <FlatList
      style={styles.container}
      data={props.groups}
      renderItem={({item}) =>
        <GroupListItem
          group={item}
          onPress={() => props.navigate('Group', { group: item, tokens: props.tokens })}
        />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: sizes.offset,
    marginRight: sizes.offset
  }
});

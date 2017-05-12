import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ActivityListItem from './ActivityListItem';

export default function ActivityList(props) {
  return (
    <FlatList
      data={props.activities.generalItems}
      renderItem={({item, index}) =>
        <ActivityListItem
          activity={item}
          index={index}
          onPress={() => props.navigate('Activity', { activity: item, tokens: props.tokens, runId: props.runId })}
        />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

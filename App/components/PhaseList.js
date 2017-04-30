import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Phase from './Phase';

export default function PhaseList(props) {
  return (
    <FlatList
      data={props.phases}
      renderItem={({item}) =>
        <Phase phase={item} />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Phase from './Phase';

export default function PhaseList(props) {
  return (
    <FlatList
      data={props.phases}
      renderItem={({item, index}) =>
        <Phase phase={item} index={index} />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

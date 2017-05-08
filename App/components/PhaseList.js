import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PhaseListItem from './PhaseListItem';

export default function PhaseList(props) {
  return (
    <FlatList
      data={props.phases}
      renderItem={({item, index}) =>
        <PhaseListItem
          phase={item}
          index={index}
          gameId={props.gameId}
          tokens={props.tokens}
          navigate={props.navigate}
        />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

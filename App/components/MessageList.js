import React, { Component } from 'react';
import { FlatList } from 'react-native';
import MessageListItem from './MessageListItem';

export default function MessageList(props) {
  return (
    <FlatList
      data={props.messages}
      renderItem={({item}) =>
        <MessageListItem
          message={item}
          currentUser={props.currentUser}
        />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

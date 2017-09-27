import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { sizes } from '../styles/sizes';
import CommentListItem from './CommentListItem';

export default function CommentList(props) {
  return (
    <FlatList
      data={props.comments}
      renderItem={({item}) =>
        <CommentListItem
          comment={item}
          comments={props.comments}
          tokens={props.tokens}
        />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

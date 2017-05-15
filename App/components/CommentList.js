import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { sizes } from '../styles/sizes';
import CommentListItem from './CommentListItem';

export default function CommentList(props) {
  return (
    <FlatList
      data={props.comments}
      renderItem={({item, index}) =>
        <CommentListItem
          comment={item}
          comments={props.comments}
          tokens={props.tokens}
          addNewComment={props.addNewComment}
        />
      }
      keyExtractor={(item, index) => index}
    />
  );
}

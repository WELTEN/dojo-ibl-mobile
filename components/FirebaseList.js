import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { getFirebaseRef, flattenFirebaseList } from '../lib/Firebase';

export default class FirebaseList extends Component {
  state = {
    items: [],
    loading: true
  };

  componentDidMount = this.getItems;

  getRef = () => getFirebaseRef(this.props.firebaseRef);

  getItems() {
    this.getRef().on('value', (snapshot) => {
      const items = snapshot.val();
      this.setState({ items, loading: false });
    });
  }

  componentWillUnmount = () => this.getRef().off();

  render = () => (
    <FlatList
      inverted
      data={flattenFirebaseList(this.state.items).reverse()}
      keyExtractor={item => item.key}
      renderItem={({ item }) => this.props.renderItem(item)}
      refreshing={this.state.loading}
    />
  );
}

FirebaseList.propTypes = {
  firebaseRef: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired
};

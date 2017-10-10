import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';

const Form = glamorous.view({
  backgroundColor: '#EEEEEE',
  flexDirection: 'row'
});

const Input = glamorous.textInput({
  padding: 12,
  paddingLeft: 24,
  fontSize: 14,
  flex: 1
});

const ButtonText = glamorous.text({
  padding: 12,
  paddingRight: 24,
  color: '#2196F3',
  fontSize: 14,
  fontWeight: 'bold'
});

export default class CommentForm extends Component {
  state = { comment: '' };

  render = () => (
    <Form>
      <Input
        style={{flex:1}}
        placeholder="Type a comment here..."
        value={this.state.comment}
        onChangeText={comment => this.setState({ comment })}
      />
      <TouchableOpacity>
        <ButtonText>Commentform</ButtonText>
      </TouchableOpacity>
    </Form>
  );
}

CommentForm.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  runId: PropTypes.number.isRequired
};

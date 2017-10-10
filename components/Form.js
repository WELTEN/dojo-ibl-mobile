import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';

const FormContainer = glamorous.view({
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

export default class Form extends Component {
  state = { text: '' };

  onSend = () => {
    if (!this.state.text) return;
    this.props.onSend(this.state.text);
    this.setState({ text: '' });
  }

  render = () => (
    <FormContainer>
      <Input
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
      <TouchableOpacity onPress={this.onSend}>
        <ButtonText>Send</ButtonText>
      </TouchableOpacity>
    </FormContainer>
  );
}

Form.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired
};

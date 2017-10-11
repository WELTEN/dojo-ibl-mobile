import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import { requestWithToken, postRequestWithToken } from '../../lib/Requests';

const Form = glamorous.view({
  marginTop: 12,
  marginLeft: 24,
  marginRight: 24,
  flexDirection: 'row'
});

const Input = glamorous.textInput({
  fontSize: 14,
  flex: 1,
  fontWeight: 'bold'
});

const ButtonText = glamorous.text({
  color: '#2196F3',
  fontSize: 14,
  fontWeight: 'bold'
}, ({ disabled }) => {
  if (disabled) return [{ opacity: .7 }];
});

const ErrorText = glamorous.text({
  marginTop: 4,
  paddingLeft: 24,
  paddingRight: 24,
  color: 'red',
  fontSize: 14,
  fontWeight: 'bold'
});

export default class RunForm extends Component {
  state = {
    code: '',
    error: '',
    adding: false
  };

  onAdd = async () => {
    if (!this.state.code || this.state.adding) return;
    this.setState({ adding: true });

    const token = this.props.token;
    const code = this.state.code.toUpperCase();

    try {
      const { runId, gameId } = await requestWithToken(`myRuns/code/${code}`, token);
      const user = await requestWithToken('account/myAccountDetails', token);
      const accountId = `${user.accountType}:${user.localId}`;

      await requestWithToken(`myRuns/access/runId/${runId}/account/${accountId}/accessRight/2`, token);
      await requestWithToken(`myGames/access/gameId/${gameId}/account/${accountId}/accessRight/2`, token);
      await postRequestWithToken(`users`, token, {
        runId,
        email: accountId,
        accountType: user.accountType,
        localId: user.localId,
        gameId
      });

      this.setState({ code: '', adding: false });
      this.props.onRefresh();
    } catch (err) {
      this.setState({ error: 'Invalid inquiry code' });
    }
  }

  isDisabled = () => this.state.code.trim().length != 5;

  render = () => (
    <View>
      <Form>
        <Input
          placeholder="Type an inquiry code here"
          value={this.state.code}
          onChangeText={code => this.setState({ code: code.toUpperCase() })}
        />
        <TouchableOpacity onPress={this.onAdd}>
          <ButtonText disabled={this.isDisabled()}>
            Join
          </ButtonText>
        </TouchableOpacity>
      </Form>
      <ErrorText>{this.state.error}</ErrorText>
    </View>
  );
}
RunForm.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired
};

import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';
import { requestWithToken, postRequestWithToken } from '../../lib/Requests';

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

  render = () => (
    <View>
      <Text>Enter code</Text>
      <TextInput
        placeholder="code"
        value={this.state.code}
        onChangeText={code => this.setState({ code })}
      />
      <Text>{this.state.error}</Text>
      <TouchableOpacity onPress={this.onAdd}><Text>add</Text></TouchableOpacity>
    </View>
  );
}
RunForm.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired
};

import React from 'react';
import { Text } from 'react-native';

const Message = ({ message }) => <Text>{JSON.stringify(message)}</Text>
export default Message;

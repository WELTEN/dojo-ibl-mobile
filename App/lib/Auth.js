import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';

export default class Auth {
  static saveTokens(accessToken, expiresAt) {
    return AsyncStorage.setItem('tokens', JSON.stringify({
        accessToken: accessToken,
        expiresAt: expiresAt
      }))
      .then(() => {
        return {
          accessToken: accessToken,
          expiresAt: expiresAt
        };
      });
  }

  static getTokens() {
    return AsyncStorage.getItem('tokens').then((tokensJson) => JSON.parse(tokensJson));
  }

  static removeTokens() {
    return AsyncStorage.removeItem('tokens');
  }

  static accessTokenExpired(token) {
    const currentTime = Math.round(Date.now() / 1000);

    return token.expiresAt <= currentTime;
  }

  static calcExpireAt(expiresIn) {
    return Math.round(Date.now() / 1000) + Number(expiresIn);
  }
}

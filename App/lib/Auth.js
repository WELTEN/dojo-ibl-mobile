import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';

export class Auth {
  static getAccessTokenJson(authToken) {
    return new Promise((resolve, reject) => {
      fetch(`https://wespot-arlearn.appspot.com/oauth/token?client_id=${Config.wespot.clientId}&redirect_uri=${Config.wespot.redirectUri}&client_secret=${Config.wespot.clientSecret}&code=${authToken}&grant_type=authorization_code`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then((response) => response.json())
        .then((json) => {
          if (json.access_token) {
            resolve(json);
          } else {
            reject('Couldn\'t get access token JSON');
          }
        })
        .catch((error) => {
          reject('Request failed!');
        });
    });
  }

  static saveTokens(authToken, accessToken, expiresAt) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem('tokens', JSON.stringify({
          authToken: authToken,
          accessToken: accessToken,
          expiresAt: expiresAt
        }))
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  static getTokens() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('tokens')
        .then((tokensJson) => {
          const tokens = JSON.parse(tokensJson);
          resolve(tokens);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  static accessTokenExpired(tokens) {
    const currentTime = Math.round(Date.now() / 1000);

    return tokens.expiresAt <= currentTime;
  }

  static refreshTokens(oldTokens) {
    console.log('Logged in with expired token!')

    return new Promise((resolve, reject) => {
      Auth.getAccessTokenJson(oldTokens.authToken)
        .then((json) => {
          const expiresAt = Math.round(Date.now() / 1000) + json.expires_in;

          console.log(json)

          return Auth.saveTokens(oldTokens.authToken, json.access_token, expiresAt);
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

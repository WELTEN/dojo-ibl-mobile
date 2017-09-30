import { AsyncStorage } from 'react-native';

export const getUserFromStorage = () => Promise.all([
  AsyncStorage.getItem('email'),
  AsyncStorage.getItem('password')
]);

export const setUserInStorage = (email, password) => Promise.all([
  AsyncStorage.setItem('email', email),
  AsyncStorage.setItem('password', password)
]);

export const deleteUserFromStorage = () => Promise.all([
  AsyncStorage.removeItem('email'),
  AsyncStorage.removeItem('password')
]);

export const getTokenFromStorage = () => AsyncStorage.getItem('token');
export const setTokenInStorage = token => AsyncStorage.setItem('token', token);
export const deleteTokenFromStorage = () => AsyncStorage.removeItem('token');

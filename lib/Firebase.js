import * as firebase from 'firebase';

export const getFirebaseRef = ref => firebase.database().ref(ref);

export const firebaseListener = (ref, callback) =>
  getFirebaseRef(ref).on('value', snapshot => callback(snapshot.val()));

export const flattenFirebaseList = (obj) => {
  if (!obj) return [];
  for (let key in obj) obj[key].key = key;
  return Object.values(obj);
};

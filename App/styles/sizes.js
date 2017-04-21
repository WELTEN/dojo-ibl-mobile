import { Dimensions } from 'react-native';

export const sizes = {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  header: {
    height: Dimensions.get('window').height * 0.3,
    profilePicture: Dimensions.get('window').width * 0.15
  }
};

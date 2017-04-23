import { colors } from './colors';

export const globalStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  title: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, .7)',
    textAlign: 'center',
    margin: 10,
  },
  whiteTitle: {
    margin: 20,
    color: colors.textColor,
    fontSize: 24,
    fontWeight: '300'
  },
  text: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, .7)',
    marginBottom: 5,
  }
};

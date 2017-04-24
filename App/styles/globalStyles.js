import { colors } from './colors';
import { sizes } from './sizes';

export const globalStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  title: {
    margin: 10,
    fontSize: 24,
    color: 'rgba(255, 255, 255, .7)',
    textAlign: 'center'
  },
  whiteTitle: {
    margin: sizes.offset,
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

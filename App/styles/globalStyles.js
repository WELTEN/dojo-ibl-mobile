import { colors } from './colors';
import { sizes } from './sizes';

export const globalStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  containerScrollView: {
    flex: 1,
    backgroundColor: colors.backgroundColor
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
    marginBottom: 10,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, .7)'
  },
  leftText: {
    marginBottom: 10,
    marginLeft: sizes.offset,
    marginRight: sizes.offset,
    color: 'rgba(255, 255, 255, .7)'
  }
};

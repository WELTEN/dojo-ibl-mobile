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
    marginTop: sizes.offset,
    marginBottom: sizes.offset,
    marginLeft: sizes.offset,
    color: colors.textColor,
    fontSize: 24,
    fontWeight: '300'
  },
  centeredTitle: {
    margin: 10,
    fontSize: 24,
    color: `rgba(${colors.textColorRgb}, .7)`,
    textAlign: 'center'
  },
  text: {
    marginBottom: sizes.offset,
    textAlign: 'center',
    color: colors.textColor
  },
  leftText: {
    marginBottom: sizes.offset,
    marginLeft: sizes.offset,
    marginRight: sizes.offset,
    color: colors.textColor
  }
};

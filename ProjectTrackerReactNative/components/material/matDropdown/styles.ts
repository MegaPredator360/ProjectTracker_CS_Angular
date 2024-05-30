import { I18nManager, Platform, StyleSheet } from 'react-native';

export const MatStyles = StyleSheet.create({
  dropdown: {
    height: 47,
    borderBottomWidth: 1,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    paddingHorizontal: 8,
    marginBottom: 20
  },
  placeholder: {
    fontSize: 16,
    position: 'absolute',
    left: -4,
    top: Platform.OS === 'ios' ? -3 : -5,
    paddingHorizontal: 4,
  },
  selectedItem: {
    flex: 1,
    fontSize: 16,
    top: Platform.OS === 'ios' ? 5 : 4,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  optionContainer: {
    flexShrink: 1,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

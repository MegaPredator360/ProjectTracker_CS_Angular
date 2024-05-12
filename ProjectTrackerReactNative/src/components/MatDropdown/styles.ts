import { I18nManager, Platform, StyleSheet } from 'react-native';

export const MatStyles = StyleSheet.create({
  placeholder: {
    fontSize: 16,
    color: '#808080',
    position: 'absolute',
    left: -4,
    top: Platform.OS === 'ios' ? -3 : -5,
    paddingHorizontal: 4,
  },
  focusedPlaceholder: {
    color: '#8E7CC3', // Label color when focused
  },
  selectedItem: {
    flex: 1,
    fontSize: 16,
    top: Platform.OS === 'ios' ? 5 : 4,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  }
});

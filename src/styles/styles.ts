import {StyleSheet, FlexAlignType} from 'react-native';
import {theme} from './theme';

const commonButton = {
  padding: 10,
  borderRadius: 5,
  alignItems: 'center' as FlexAlignType | undefined,
  justifyContent: 'center' as
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined,
};
export const buttons = StyleSheet.create({
  button_primary: {
    backgroundColor: theme.primary_accent,
    color: theme.text_primary,
    ...commonButton,
  },
  button_secondary: {
    backgroundColor: theme.secondary_accent,
    color: theme.text_primary,
    ...commonButton,
  },
  button_error: {
    backgroundColor: theme.error_warning,
    color: theme.text_primary,
    ...commonButton,
  },
});

export const inputs = StyleSheet.create({
  input_primary: {
    color: theme.text_primary,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export const app = StyleSheet.create({
  container: {
    backgroundColor: theme.primary_bg,
    padding: 10,
  },
});

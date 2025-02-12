// styles.js
import { StyleSheet, FlexAlignType, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

// Common button styles
const commonButton = {
  padding: 10,
  borderRadius: 5,
  display: 'flex' as 'flex' | 'none' | undefined,
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

// Hook to get the current theme
const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

// Export styles as a function
export const useStyles = () => {
  const theme = useTheme();

  return {
    buttons: StyleSheet.create({
      button_primary: {
        backgroundColor: theme.primary_accent,
        ...commonButton,
      },
      button_secondary: {
        backgroundColor: theme.secondary_accent,
        ...commonButton,
      },
      button_tertiary: {
        backgroundColor: theme.diable_button,
        ...commonButton,
      },
      button_error: {
        backgroundColor: theme.error_warning,
        ...commonButton,
      },
    }),
    inputs: StyleSheet.create({
      input_primary: {
        color: theme.text_primary,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
      },
    }),
    app: StyleSheet.create({
      container: {
        backgroundColor: theme.primary_bg,
        padding: 10,
      },
    }),
    themeColor: StyleSheet.create({
      primary: {
        backgroundColor: theme.primary_bg,
        color: theme.text_primary,
        borderColor: theme.borders_dividers,
      },
      secondary: {
        backgroundColor: theme.secondary_bg,
        color: theme.text_secondary,
        borderColor: theme.borders_dividers,
      },
    }),
    variables: {
      placeholderTextColor: theme.text_secondary,
      colors: {
        primary: theme.primary_accent,
        secondary: theme.secondary_accent,
        error: theme.error_warning,
      },
    },
  };
};

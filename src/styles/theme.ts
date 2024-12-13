export const isDarkMode = false;

const commonTheme = {
  primary_accent: '#4CAF50',
  secondary_accent: '#8BC34A',
  error_warning: '#FF5252',
  text_tertiary: '#163723',
};

const darkTheme = {
  ...commonTheme,
  primary_bg: '#121212',
  secondary_bg: '#1E1E1E',
  text_primary: '#FFFFFF',
  text_secondary: '#B0B0B0',
  borders_dividers: '#333333',
  bar_style: 'light-content' as 'light-content' | 'dark-content',
};

const lightTheme = {
  ...commonTheme,
  primary_bg: '#FAFAFA',
  secondary_bg: '#F0F0F0',
  text_primary: '#121212',
  text_secondary: '#606060',
  borders_dividers: '#E0E0E0',
  bar_style: 'dark-content' as 'light-content' | 'dark-content',
};

export const theme = isDarkMode ? darkTheme : lightTheme;

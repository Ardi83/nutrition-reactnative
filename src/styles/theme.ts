export const commonTheme = {
  primary_accent: '#4CAF50',
  secondary_accent: '#8BC34A',
  error_warning: '#FF5252',
  text_tertiary: '#163723',
};

export const darkTheme = {
  ...commonTheme,
  primary_bg: '#121212',
  secondary_bg: '#1E1E1E',
  text_primary: '#FFFFFF',
  text_secondary: '#B0B0B0',
  diable_button: '#5A5A5A',
  borders_dividers: '#D3D3D3',
  bar_style: 'light-content' as 'light-content' | 'dark-content',
};

export const lightTheme = {
  ...commonTheme,
  primary_bg: '#FAFAFA',
  secondary_bg: '#F0F0F0',
  text_primary: '#121212',
  text_secondary: '#606060',
  diable_button: '#D0D0D0',
  borders_dividers: '#A9A9A9',
  bar_style: 'dark-content' as 'light-content' | 'dark-content',
};

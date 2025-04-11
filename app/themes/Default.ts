// themes.ts
import { DefaultTheme as NavigationDefault, DarkTheme as NavigationDark } from '@react-navigation/native';
import { DefaultTheme as PaperDefault, MD3DarkTheme as PaperDark } from 'react-native-paper';

export const CustomLightTheme = {
  ...NavigationDefault,
  ...PaperDefault,
  colors: {
    ...NavigationDefault.colors,
    ...PaperDefault.colors,
    primary: '#4CAF50', // Verde personalizado
    background: '#ffffff',
    text: '#000000',
    surface: '#f2f2f2',
    onSurface: '#000000',
  },
};

export const CustomDarkTheme = {
  ...NavigationDark,
  ...PaperDark,
  colors: {
    ...NavigationDark.colors,
    ...PaperDark.colors,
    primary: 'white', // Verde claro para dark
    background: '#121212',
    text: '#ffffff',
    surface: 'red',
    onSurface: '#ffffff',
  },
};

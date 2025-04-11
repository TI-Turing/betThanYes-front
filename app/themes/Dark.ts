// themes/theme.ts
import { MD3DarkTheme, configureFonts, MD3Theme  } from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'SpaceMono',
      fontWeight: 'normal',
    },
  },
};

export const CustomDarkTheme: MD3Theme  = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#2979FF',
    background: '#121212',
    surface: '#1E1E1E',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    outline: '#2C2C2C',
    error: '#FF5252',
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    bodyLarge: {
      ...MD3DarkTheme.fonts.bodyLarge,
      fontFamily: 'SpaceMono',
    },
    bodyMedium: {
      ...MD3DarkTheme.fonts.bodyMedium,
      fontFamily: 'SpaceMono',
    },
    bodySmall: {
      ...MD3DarkTheme.fonts.bodySmall,
      fontFamily: 'SpaceMono',
    },
    titleLarge: {
      ...MD3DarkTheme.fonts.titleLarge,
      fontFamily: 'SpaceMono',
    },
    // puedes seguir agregando más según necesites
  },
};

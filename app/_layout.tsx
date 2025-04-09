import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './auth/authContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <PaperProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }} />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

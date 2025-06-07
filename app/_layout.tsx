import { CustomLightTheme } from './themes/Default';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './auth/screens/authContext';
import { Stack } from 'expo-router';
import { CustomDarkTheme } from './themes/Dark';

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <PaperProvider theme={CustomDarkTheme}>
      <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
          {children}
      </AuthProvider>
    </PaperProvider>
  );
}

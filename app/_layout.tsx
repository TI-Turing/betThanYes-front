import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'; // <-- Importación necesaria

import { AuthProvider, useAuth } from '@/app/auth/authContext';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

function RootNavigation() {
  const { isAuthenticated, token } = useAuth();

  return (
    <>
      {/* 🔧 Mostrar token temporalmente en el centro */}
      {/* <View style={{
        paddingVertical: 6,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: 13, color: '#333' }}>
          Token: {token || 'No hay token'}
        </Text>
        <Text style={{ fontSize: 13, color: '#333' }}>
          isAuthenticated: {isAuthenticated || 'No'}
        </Text>
      </View> */}
      <Stack>
        <Stack.Screen name="auth/login1" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <PaperProvider> 
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <RootNavigation />
          <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

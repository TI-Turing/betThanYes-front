import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from './auth/screens/authContext'; // ajusta la ruta si es diferente

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('./(tabs)/'); // redirige a la pantalla principal con tabs
      } else {
        router.replace('/auth/screens/login1'); // redirige al login
      }
    }
  }, [isAuthenticated, isLoading]);

  return null; // mientras carga no se muestra nada
}

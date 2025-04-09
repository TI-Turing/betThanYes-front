import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useAuth } from './authContext'; // ajusta la ruta si es diferente
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login1'); // redirige a login
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

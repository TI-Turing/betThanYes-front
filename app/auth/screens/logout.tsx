import React from 'react';
import { View, Button, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native'; // Agregar StyleSheet
import { useAuth } from './authContext'; // ajusta la ruta si es diferente
import { useRouter } from 'expo-router';

const LogoutOption = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Sesión cerrada con éxito');
      router.replace('/auth/login1'); // redirige a login
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
      <Text style={styles.menuText}>Cerrar sesión</Text>
    </TouchableOpacity>
  );
};

export default LogoutOption;

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#ffffff',
  },
});
import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';

const LoginPasswordScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Email recibido:', email); // Verifica si el email está llegando
  }, [email]);

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://<tu-api-url>/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message =
          response.status === 401
            ? 'Credenciales inválidas'
            : response.status === 500
            ? 'Error del servidor. Inténtalo más tarde.'
            : 'Error al iniciar sesión';
        throw new Error(message);
      }

      const data = await response.json();
      Alert.alert('Éxito', 'Has iniciado sesión correctamente');

      // Aquí puedes guardar el token en asyncStorage o redirigir
      // router.replace('/(tabs)/index');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Estas de vuelta!</Text>

      {/* Saludo con el correo */}
      <Text style={styles.greeting}>
        Hola {email || 'Usuario'},
      </Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={22} color="#555" style={styles.icon} />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="flat"
        />
      </View>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Iniciar sesión
      </Button>
    </View>
  );
};

export default LoginPasswordScreen;

import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('jlap.11@hotmail.com');
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Simula la llamada al servicio para verificar si el correo está registrado
  const checkEmailExists = async (email: string): Promise<number> => {
    // Aquí deberías hacer una llamada real a tu API
    // Por ejemplo:
    // const response = await fetch('http://<tu-api-url>/check-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });
    // const data = await response.json();
    // return data.exists; // Suponiendo que el servicio devuelve { exists: 1 } o { exists: 0 }

    // Simulación de respuesta del servicio
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'jlap.11@hotmail.com') {
          resolve(1); // Correo registrado
        } else {
          resolve(0); // Correo no registrado
        }
      }, 1000); // Simula un retraso de 1 segundo
    });
  };

  const handleNext = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo válido');
      return;
    }

    setLoading(true);
    try {
      // Llama al servicio para verificar si el correo está registrado
      const emailExists = await checkEmailExists(email);

      if (emailExists === 1) {
        // Redirige a login2 si el correo está registrado
        router.push({
          pathname: '/auth/login2',
          params: { email },
        });
      } else {
        // Redirige a register1 si el correo no está registrado
        router.push({
          pathname: '/auth/register1',
          params: { email },
        });
      }
    } catch (error: any) {
      Alert.alert('Error', 'Algo salió mal al validar el correo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#555" style={styles.icon} />
        <TextInput
          label="Correo"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          mode="flat"
        />
      </View>

      <Button
        mode="contained"
        onPress={handleNext}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Siguiente
      </Button>

      <TouchableOpacity onPress={() => router.push('/auth/register1')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

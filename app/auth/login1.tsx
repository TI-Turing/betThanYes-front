import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de importar AsyncStorage
import styles from './styles'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';
import { ValidateEmailRequest } from "../interfaces/account/validateEmailRequest";
import { ValidateEmailResponse } from "../interfaces/account/validateEmailResponse";
import { ApiResponse } from "../interfaces/ApiResponse";
import { validateEmail } from "../services/validateEmail"; // Asegúrate de que la ruta sea correcta

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('jlap.11@hotmail.com');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const setUserId = async () => {
      await AsyncStorage.setItem('userId', '');
    };

    setUserId();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const checkEmailExists = async (email: string): Promise<number> => {
    try {
      const apiRequest: ValidateEmailRequest = {
        email: email, // Agrega el parámetro de consulta con el valor del email
      };

      const result = await validateEmail(apiRequest);

      console.log('Resultado de la validación del correo:', result.Data.Result);
      if (result.Data.Result) {
        console.log('Correo registrado en la base de datos');
        return 1; // Correo registrado
      } else {
        console.log('Correo no registrado en la base de datos');
        return 0; // Correo no registrado
      }
    } catch (error) {
      console.error('Error al validar el correo:', error);
      throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
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
      const emailExists = await checkEmailExists(email);
      console.log('Estado del correo:', emailExists);
      if (emailExists == 1) {
        console.log('Correo registrado, redirigiendo a login2...');
        router.push({
          pathname: '/auth/login2',
          params: { email },
        });
      } else {
        console.log('Correo no registrado, redirigiendo a register1...');
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

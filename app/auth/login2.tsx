import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../auth/authContext';
import { resetPassword } from "../services/resetPasswordService";
import { ResetPasswordRequest } from "../interfaces/auth/resetPasswordRequest";

const LoginPasswordScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { login } = useAuth();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const resetPasswordHandler = async ()  => {
    const apiRequest: ResetPasswordRequest = {
      Email: email
    }
     if((await resetPassword(apiRequest)).Data.Result) {
      Alert.alert('Éxito', 'Se ha enviado un correo para restablecer tu contraseña, rebica tu bandeja de entrada o spam.');
    } else {
      Alert.alert('Error', 'No se pudo enviar el correo para restablecer la contraseña.');
    }
  };

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'No se recibió un correo electrónico válido.');
      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        // Redirige al tab principal. La redirección final la controla el layout si está autenticado.
        router.replace('../(tabs)/');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón para retroceder */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={20} color="#555" />
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <Text style={styles.title}>¡Estás de vuelta!</Text>
      <Text style={styles.greeting}>Hola {email || 'Usuario'},</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={22} color="#555" style={styles.icon} />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Cambia según el estado de `showPassword`
          style={styles.input}
          mode="flat"
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'} // Cambia el ícono según el estado
              onPress={() => setShowPassword(!showPassword)} // Cambia el estado al presionar
              color="#aaa"
              size={20}
            />
          }
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

      {/* Opción de recuperar contraseña */}
      <TouchableOpacity 
      onPress={() => resetPasswordHandler()}
      >
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPasswordScreen;

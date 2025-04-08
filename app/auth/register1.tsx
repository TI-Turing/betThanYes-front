import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ProgressHeader from './components/headerBar'; // Asegúrate de que la ruta sea correcta
import styles from '../styles/stylesRegister'; // Usa los mismos estilos que en login
import { createUser } from '../services/createUser'; // Asegúrate de que la ruta sea correcta
import { ApiRequest } from "../interfaces/user/createRequest";

export default function RegisterStepOne() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>(); // Obtén el correo desde los parámetros
  const [password, setPassword] = useState('3125475329a');
  const [confirmPassword, setConfirmPassword] = useState('3125475329a');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación
  const [rulesStatus, setRulesStatus] = useState({
    length: 'black',
    letter: 'black',
    number: 'black',
    match: 'black', // Nueva regla: las contraseñas deben coincidir
  });

  // Valida si la contraseña cumple con las reglas y actualiza los colores
  const validatePassword = (password: string, confirmPassword: string) => {
    const newRulesStatus = { ...rulesStatus };

    // Regla 1: Longitud
    newRulesStatus.length =
      password.length >= 8 && password.length <= 24 ? 'green' : 'red';

    // Regla 2: Contiene al menos una letra
    newRulesStatus.letter = /[a-zA-Z]/.test(password) ? 'green' : 'red';

    // Regla 3: Contiene al menos un número
    newRulesStatus.number = /\d/.test(password) ? 'green' : 'red';

    // Regla 4: Las contraseñas deben coincidir
    newRulesStatus.match = password === confirmPassword && password.length > 0 ? 'green' : 'red';

    setRulesStatus(newRulesStatus);
  };

  const isFormValid = () => {
    return Object.values(rulesStatus).every((status) => status === 'green');
  };

  const handleNext = () => {
    router.push({
      pathname: '/auth/register2',
      params: { email, password },
    });
  };

  const create = async () => {
    setLoading(true);
    try {
      console.log('Creando usuario...');
      const apiRequest: ApiRequest = {
        email: email || '', // Asegúrate de que el correo esté definido aquí
        password: password || '', // Asegúrate de que la contraseña esté definida aqui
      }
      // Llama al servicio createUser
      await createUser(apiRequest);
      // Si no hay errores, llama a handleNext
      handleNext();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {/* Barra de progreso */}
        <View style={styles.progressContainer}>
          <ProgressHeader step={1} totalSteps={3} />
        </View>

        {/* Saludo con el correo */}
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.greeting}>Hola {email || 'Usuario'},</Text>

        {/* Reglas de la contraseña */}
        <View style={styles.rulesContainer}>
          <Text style={[styles.rule, { color: rulesStatus.length }]}>
            - Tener entre 8 y 24 caracteres.
          </Text>
          <Text style={[styles.rule, { color: rulesStatus.letter }]}>
            - Contener al menos una letra.
          </Text>
          <Text style={[styles.rule, { color: rulesStatus.number }]}>
            - Contener al menos un número.
          </Text>
          <Text style={[styles.rule, { color: rulesStatus.match }]}>
            - Las contraseñas deben coincidir.
          </Text>
        </View>

        {/* Campos de contraseña */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text, confirmPassword);
            }}
            secureTextEntry={!showPassword}
            style={styles.input}
            mode="flat"
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color="#aaa" // Color más claro
                size={20} // Tamaño más pequeño
              />
            }
          />
          <TextInput
            label="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validatePassword(password, text);
            }}
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            mode="flat"
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                color="#aaa" // Color más claro
                size={20} // Tamaño más pequeño
              />
            }
          />
        </View>

        {/* Botón siguiente */}
        <Button
          mode="contained"
          onPress={create} // Llama al método create
          style={styles.button}
          loading={loading}
          disabled={!isFormValid() || loading} // Deshabilitado si las reglas no se cumplen o si está cargando
        >
          Siguiente
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

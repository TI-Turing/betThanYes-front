import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/stylesRegister'; // Usa los mismos estilos que en login
import { createUser } from '../../services/createUser'; // Asegúrate de que la ruta sea correcta
import { ApiRequest } from "../../interfaces/user/createRequest";

export default function RegisterStepOne() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>(); // Obtén el correo desde los parámetros
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      pathname: '/auth/screens/register2',
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
      };
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
        {/* Botón para retroceder */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color="#555" />
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>

        {/* Contenedor para centrar el contenido */}
        <View style={styles.content}>
          {/* Saludo con el correo */}
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.greeting}>Hola {email || 'Usuario'},</Text>

          {/* Reglas de la contraseña */}
          <View style={styles.rulesContainer}>
          <Text style={[styles.rule]}>
              La contraseña debe cumplir con las siguientes reglas:
            </Text>
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
                  color="#aaa"
                  size={20}
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
                  color="#aaa"
                  size={20}
                />
              }
            />
          </View>

          {/* Botón siguiente */}
          <Button
            mode="contained"
            onPress={create}
            style={styles.button}
            loading={loading}
            disabled={!isFormValid() || loading}
          >
            Siguiente
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

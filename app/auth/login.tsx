// import React, { useState } from 'react';
// import { View, Text, Alert, TouchableOpacity } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import styles from './styles'; // Asegúrate de que la ruta sea correcta


// type AuthStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
// };


// const LoginScreen = ({ navigation }) => {
//   // Especifica el tipo de los estados como string
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const isValidEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email.trim());
//   };

//   const handleLogin = async () => {
//     if (!email.trim() || !password) {
//       Alert.alert('Error', 'Por favor completa todos los campos');
//       return;
//     }

//     if (!isValidEmail(email)) {
//       Alert.alert('Error', 'Por favor ingresa un correo válido');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('http://<tu-api-url>/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: email.trim(), password }),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Credenciales inválidas');
//         } else if (response.status === 500) {
//           throw new Error('Error del servidor. Inténtalo más tarde.');
//         } else {
//           throw new Error('Error al iniciar sesión. Inténtalo más tarde.');
//         }
//       }

//       const data = await response.json();
//       Alert.alert('Éxito', 'Has iniciado sesión correctamente');
//       navigation.navigate('Home');
//     } catch (error: any) {
//       if (error.message === 'Network request failed') {
//         Alert.alert('Error', 'No se pudo conectar con el servidor. Verifica tu conexión a internet.');
//       } else {
//         Alert.alert('Error', error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Iniciar Sesión</Text>

//       <View style={styles.inputContainer}>
//         <FontAwesome name="envelope" size={20} color="#555" style={styles.icon} />
//         <TextInput
//           label="Correo"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           style={styles.input}
//           mode="flat"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <FontAwesome name="lock" size={22} color="#555" style={styles.icon} />
//         <TextInput
//           label="Contraseña"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//           mode="flat"
//         />
//       </View>

//       <Button
//         mode="contained"
//         onPress={handleLogin}
//         style={styles.button}
//         loading={loading}
//         disabled={loading}
//       >
//         Iniciar sesión
//       </Button>

//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;


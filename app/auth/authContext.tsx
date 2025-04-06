// // src/context/AuthContext.tsx
// import React, {
//     createContext,
//     useEffect,
//     useState,
//     useContext,
//     ReactNode,
//   } from 'react';
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//   import { View, Text, ActivityIndicator, Alert } from 'react-native';
  
//   interface AuthContextType {
//     isLoggedIn: boolean;
//     isLoading: boolean;
//     token: string | null;
//     login: (token: string) => Promise<void>;
//     logout: () => Promise<void>;
//   }
  
//   const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
//   export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//       throw new Error('useAuth debe usarse dentro de un AuthProvider');
//     }
//     return context;
//   };
  
//   interface AuthProviderProps {
//     children: ReactNode;
//   }
  
//   export const AuthProvider = ({ children }: AuthProviderProps) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [token, setToken] = useState<string | null>(null);
  
//     useEffect(() => {
//       const initializeAuth = async () => {
//         try {
//           const storedToken = await AsyncStorage.getItem('token');
//           if (storedToken) {
//             setToken(storedToken);
//             setIsLoggedIn(true);
//           }
//         } catch (error) {
//           console.error('Error al verificar el token:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
  
//       initializeAuth();
//     }, []);
  
//     const login = async (newToken: string) => {
//       try {
//         await AsyncStorage.setItem('token', newToken);
//         setToken(newToken);
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Error al guardar el token:', error);
//         Alert.alert('Error', 'No se pudo iniciar sesión. Inténtalo de nuevo.');
//       }
//     };
  
//     const logout = async () => {
//       try {
//         await AsyncStorage.removeItem('token');
//         setToken(null);
//         setIsLoggedIn(false);
//       } catch (error) {
//         console.error('Error al eliminar el token:', error);
//         Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
//       }
//     };
  
//     if (isLoading) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>Cargando...</Text>
//         </View>
//       );
//     }
  
//     return (
//       <AuthContext.Provider
//         value={{ isLoggedIn, isLoading, token, login, logout }}
//       >
//         {children}
//       </AuthContext.Provider>
//     );
//   };
  
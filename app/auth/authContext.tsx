import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from 'react';
  import * as SecureStore from 'expo-secure-store';
  import { Alert } from 'react-native';
  import {
    login as authServiceLogin,
    logout as authServiceLogout,
    getAccessToken,
  } from '../services/authService';
  
  interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    accessToken: string | null;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
  };
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = await getAccessToken();
          if (token) {
            setIsAuthenticated(true);
            setAccessToken(token);
          }
        } catch (error) {
          console.error('Error al obtener token:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      checkAuth();
    }, []);
  
    const login = async (email: string, password: string): Promise<boolean> => {
      try {
        const success = await authServiceLogin({ email, password });
  
        if (success) {
          const token = await getAccessToken();
          setAccessToken(token);
          setIsAuthenticated(true);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error en login:', error);
        Alert.alert('Error', 'No se pudo iniciar sesión. Inténtalo de nuevo.');
        return false;
      }
    };
  
    const logout = async () => {
      try {
        await authServiceLogout();
        setAccessToken(null);
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
      }
    };
  
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          isLoading,
          login,
          logout,
          accessToken,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
import * as SecureStore from 'expo-secure-store';
import { LoginRequest } from "../interfaces/auth/loginRequest";
import { LoginResponse } from "../interfaces/auth/loginResponse";
import api from "./api";
import { ApiResponse } from "../interfaces/ApiResponse";

const ROUTES = {
  LOGIN: "/LoginFunction",
};

export const login = async (credentials: LoginRequest): Promise<boolean> => {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>(`${ROUTES.LOGIN}/`, credentials);

    if (response.data.Success) {
      const { AccessToken, RefreshToken } = response.data.Data;

      console.log('Access Token:', AccessToken);
        console.log('Refresh Token:', RefreshToken);
        console.log('Email:', credentials.email);

      await SecureStore.setItemAsync('accessToken', AccessToken);
      await SecureStore.setItemAsync('refreshToken', RefreshToken);
      await SecureStore.setItemAsync('userEmail', credentials.email);

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
  await SecureStore.deleteItemAsync('userEmail');
};

export const getAccessToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('accessToken');
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('refreshToken');
};

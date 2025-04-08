import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de instalar esta librería
import api from "./api";
import {RegisterUserResponse } from "../interfaces/user/createResponse";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ApiRequest } from "../interfaces/user/createRequest";


const ROUTES = {
  REGISTER: "/createUser",
};

export const createUser = async (
  apiRequest: ApiRequest
): Promise<ApiResponse<RegisterUserResponse>> => {
  try {
    console.log("Inicia");

    // const prueba = api.post<any>(
    //   ROUTES.REGISTER,
    //   { email, password }
    // );
    // console.log("Prueba: ", prueba);
    const response = await api.post<ApiResponse<RegisterUserResponse>>(
      ROUTES.REGISTER,
      apiRequest
    );
    
    // Accede correctamente a response.data.Value.Id
    const userId = response.data.Data.Id ?? "";

    console.log("Antes de guardar el userId:", userId);

    // Guarda el userId en la sesión
    await AsyncStorage.setItem('userId', userId);

    console.log("Después de guardar el userId:", userId);

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al registrar el usuario. URL: " + ROUTES.REGISTER;

    console.error("Error registrando usuario:", errorMessage);
    console.log("Enviando datos:", apiRequest.email);
    console.log("URL completa:", api.defaults.baseURL + ROUTES.REGISTER);

    throw new Error(errorMessage);
  }
};

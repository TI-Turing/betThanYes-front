import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de instalar esta librería
import api from "./api";
import { UpdateUserRequest } from "../interfaces/user/updateRequest";
import { UpdateUserResponse } from "../interfaces/user/updateResponse";
import { ApiResponse } from "../interfaces/ApiResponse";


const ROUTES = {
  UPDATE: "/updateUser",
};

export const updateUser = async (
  apiRequest: UpdateUserRequest
): Promise<ApiResponse<UpdateUserResponse>> => {
  try {
    const response = await api.post<ApiResponse<UpdateUserResponse>>(
      ROUTES.UPDATE,
      apiRequest
    );
    

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al actualizar el usuario. URL: " + ROUTES.UPDATE;

    console.error("Error registrando usuario:", errorMessage);
    console.log("Enviando datos:", apiRequest.fullName);
    console.log("URL completa:", api.defaults.baseURL + ROUTES.UPDATE);

    throw new Error(errorMessage);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de instalar esta librería
import api from "./api";
import { ResetPasswordRequest } from "../interfaces/auth/resetPasswordRequest";
import { ResetPasswordResponse } from "../interfaces/auth/resetPasswordResponse";
import { ApiResponse } from "../interfaces/ApiResponse";


const ROUTES = {
  UPDATE: "/ResetPassword",
};

export const resetPassword = async (
  apiRequest: ResetPasswordRequest
): Promise<ApiResponse<ResetPasswordResponse>> => {
  try {
    const response = await api.get<ApiResponse<ResetPasswordResponse>>(
      ROUTES.UPDATE,
      {
        params: {
          Email: apiRequest.Email, // Agrega el parámetro de consulta con el valor del email
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al recuperar la contraseña. URL: " + ROUTES.UPDATE;

    console.error("Error validando el email:", errorMessage);

    throw new Error(errorMessage);
  }
};

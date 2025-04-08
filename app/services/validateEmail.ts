import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de instalar esta librería
import api from "./api";
import { ValidateEmailRequest } from "../interfaces/account/validateEmailRequest";
import { ValidateEmailResponse } from "../interfaces/account/validateEmailResponse";
import { ApiResponse } from "../interfaces/ApiResponse";


const ROUTES = {
  UPDATE: "/authFunction",
};

export const validateEmail = async (
  apiRequest: ValidateEmailRequest
): Promise<ApiResponse<ValidateEmailResponse>> => {
  try {
    const response = await api.get<ApiResponse<ValidateEmailResponse>>(
      ROUTES.UPDATE,
      {
        params: {
          email: apiRequest.email, // Agrega el parámetro de consulta con el valor del email
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al actualizar el usuario. URL: " + ROUTES.UPDATE;

    console.error("Error validando el email:", errorMessage);

    throw new Error(errorMessage);
  }
};

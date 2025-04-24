import api from "../api";
import { Routine} from '../../interfaces/routine/routine';
import {ApiResponse} from '../../interfaces/ApiResponse'; // Asegúrate de instalar esta librería

const ROUTES = {
  GET_ALL_BY_USERID: "/Routines",
};


export const GetAllRoutinesByUserId = async (Id: string): Promise<Routine[]> => {
  try {
    const response = await api.get<ApiResponse<Routine[]>>(ROUTES.GET_ALL_BY_USERID, {
        params: {
          Id: Id, // Agrega el parámetro de consulta con el valor del email
        },
      });
    return response.data.Data; // Devuelve la lista de rutinas
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
      "Error desconocido al obtener las rutinas. URL: " + api.getUri() + ROUTES.GET_ALL_BY_USERID;
    console.error("Error: ", errorMessage);
    throw new Error(errorMessage);
  }
};
import api from "./api";
import { InsertRoutineRequest} from '../interfaces/routine/request';


interface CreateRoutineResponse {
  id: string;
  name: string;
  // Otros campos que devuelve la API
}

const ROUTES = {
  CREATE_ROUTINE: "/CreateRoutine",
};

const validateRoutineData = (data: InsertRoutineRequest) => {
    console.log("Nombre: " + data.Name);
  if (!data.Name) {
    throw new Error("El nombre de la rutina es obligatorio");
  }
  // Agrega otras validaciones según sea necesario
};

export const createRoutine = async (routineData: InsertRoutineRequest): Promise<CreateRoutineResponse> => {
  validateRoutineData(routineData);
  try {
    const response = await api.post<CreateRoutineResponse>( ROUTES.CREATE_ROUTINE, routineData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error desconocido al crear la rutina. URL: " + ROUTES.CREATE_ROUTINE;
    console.error("Error creando rutina:", errorMessage);
    console.log("Enviando rutina:", routineData);
    console.log("URL completa:", api.defaults.baseURL + ROUTES.CREATE_ROUTINE);

    throw new Error(errorMessage);
  }
};
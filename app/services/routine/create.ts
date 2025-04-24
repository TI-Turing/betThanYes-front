import api from "../api";
import { CreateRoutineRequest} from '../../interfaces/routine/createRequest';
import { CreateRoutineResponse } from '../../interfaces/routine/createResponse';

const ROUTES = {
  CREATE_ROUTINE: "/CreateRoutine",
};

const validateRoutineData = (data: CreateRoutineRequest) => {
    console.log("Nombre: " + data.Name);
  if (!data.Name) {
    throw new Error("El nombre de la rutina es obligatorio");
  }
  // Agrega otras validaciones según sea necesario
};

export const createRoutine = async (routineData: CreateRoutineRequest): Promise<CreateRoutineResponse> => {
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
import api from "./api";
import { UploadFileRequest } from '../interfaces/file/request';
import { ApiResponse } from "../interfaces/ApiResponse";
import { UploadResponse } from "../interfaces/file/uploadResponse";

const ROUTES = {
  UPLOAD_FILE: "/Upload",
};

export const uploadFile = async (fileData: UploadFileRequest): Promise<ApiResponse<UploadResponse>> => {
  try {
    console.log("Iniciando la subida del archivo:", fileData.fileName); // Agrega esta línea para depuración
    const response = await api.post<ApiResponse<UploadResponse>>( ROUTES.UPLOAD_FILE, fileData);
    console.log("Respuesta de la API:", response.data.Data.Result); // Agrega esta línea para depuración
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error desconocido al crear la rutina. URL: " + ROUTES.UPLOAD_FILE;
    console.error("Error subiendo el archivo:", errorMessage);
    console.log("Enviando archivo:", fileData.fileName);
    console.log("URL completa:", api.defaults.baseURL + ROUTES.UPLOAD_FILE);

    throw new Error(errorMessage);
  }
};
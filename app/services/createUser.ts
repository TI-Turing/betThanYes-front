import api from "./api";


interface RegisterUserResponse {
  token: string; // Supongamos que devuelve un token tras registrarse
  userId: string;
  // Otros datos que devuelva el backend
}

const ROUTES = {
  REGISTER: "/createUser",
};


export const createUser = async (
  email: string,
  password: string
): Promise<RegisterUserResponse> => {

  try {
    const response = await api.post<RegisterUserResponse>(
      ROUTES.REGISTER,
      {email, password}
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al registrar el usuario. URL: " + ROUTES.REGISTER;
    console.error("Error registrando usuario:", errorMessage);
    console.log("Enviando datos:", email);
    console.log("URL completa:", api.defaults.baseURL + ROUTES.REGISTER);

    throw new Error(errorMessage);
  }
};

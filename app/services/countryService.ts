import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api";
import { ApiResponse } from "../interfaces/ApiResponse";
import { GetCountriesResponse } from "../interfaces/country/getCountries";

const ROUTES = {
  GET_COUNTRIES: "/GetCountries",
};

const COUNTRIES_CACHE_KEY = "countries_cache";
export const getCountries = async (): Promise<GetCountriesResponse[]> => {
  try {
    console.log("Intentando cargar países desde el caché...");
    const cachedCountries = await AsyncStorage.getItem(COUNTRIES_CACHE_KEY);

    if (cachedCountries) {
      console.log("Países cargados desde el caché.");
      return JSON.parse(cachedCountries);
    }

    console.log("Cargando países desde el servidor...");
    const response = await api.get<ApiResponse<GetCountriesResponse[]>>(ROUTES.GET_COUNTRIES);

    const countries = response.data.Data;

    // Guardar en el caché
    await AsyncStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify(countries));
    console.log("Países guardados en el caché.");

    return countries;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Error desconocido al obtener los países. URL: " + ROUTES.GET_COUNTRIES;

    console.error("Error obteniendo países:", errorMessage);
    throw new Error(errorMessage);
  }
};

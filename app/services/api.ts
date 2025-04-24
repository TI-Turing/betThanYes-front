// services/api.ts
import axios from "axios";
import  getEnvVars  from '../../env'; // Asegúrate de que la ruta sea correcta

const api = axios.create({
    baseURL:  "https://fn-app-betthanyes.azurewebsites.net/api", // si estás en Android emulator usa 10.0.2.2 en lugar de localhost
});

api.defaults.headers["x-functions-key"] = "cOegNLMRv793KwNCnr_A98gNP4lNy1VgDLcDS8HOIAV4AzFu_UUDug==";
console.log('API Base URL:', getEnvVars.API_BASE_URL); // Verifica que la URL base se esté configurando correctamente   
export default api;

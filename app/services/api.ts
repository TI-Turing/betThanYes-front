// services/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.2.2:7269/api", // si estás en Android emulator usa 10.0.2.2 en lugar de localhost
});

export default api;

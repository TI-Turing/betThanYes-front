
export interface UpdateUserRequest {
    id: string;
    fullName: string;
    birthDate: string;
    gender: string;
    username: string; // Nuevo campo para nombre de usuario
    countryCode: string; // Nuevo campo para país
  }
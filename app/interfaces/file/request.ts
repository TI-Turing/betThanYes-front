export interface UploadFileRequest {
    fileName: string;
    base64Content: string;
    fileType: number; // o enum si usas TypeScript avanzado
    idUser: string; // Guid
  }
  
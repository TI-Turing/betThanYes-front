import * as FileSystem from 'expo-file-system';

interface FileAsset {
  uri: string;
  type?: string;
}

/**
 * Convierte un archivo a base64 desde su URI usando FileSystem.
 * @param fileAsset Objeto con la URI del archivo.
 * @param mimeType Tipo MIME (ej: 'image/jpeg')
 * @returns Cadena base64 con prefijo MIME o null si falla
 */
export const fileToBase64 = async (
  fileAsset: FileAsset,
  mimeType?: string
): Promise<string | null> => {
  if (!fileAsset.uri) return null;

  try {
    // Usamos directamente la URI tal como viene
    const base64String = await FileSystem.readAsStringAsync(fileAsset.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const type = mimeType || fileAsset.type || 'application/octet-stream';
    return `data:${type};base64,${base64String.replace(/^data:image\/\w+;base64,/, '')}`;
  } catch (error) {
    console.error('Error convirtiendo archivo a base64:', error);
    return null;
  }
};

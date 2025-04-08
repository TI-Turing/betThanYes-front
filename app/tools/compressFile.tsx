import * as ImageManipulator from 'expo-image-manipulator';
import { ImagePickerAsset } from 'expo-image-picker';

/**
 * Comprime una imagen reduciendo su resolución y calidad.
 * @param fileAsset Imagen seleccionada desde expo-image-picker.
 * @param maxSizePx Máximo tamaño (ancho o alto) en píxeles. Por defecto 1024.
 * @param quality Calidad de compresión (0.0 a 1.0). Por defecto 0.7.
 * @returns Nuevo objeto con la imagen comprimida.
 */
export const compressImage = async (
  fileAsset: ImagePickerAsset,
  maxSizePx: number = 1024,
  quality: number = 0.7
): Promise<Partial<ImagePickerAsset> | null> => {
  if (!fileAsset.uri || !fileAsset.type?.startsWith('image')) return null;

  try {
    const { width, height } = fileAsset;

    let newWidth = width ?? maxSizePx;
    let newHeight = height ?? maxSizePx;

    if (width && height) {
      const aspectRatio = width / height;
      if (width > height) {
        newWidth = maxSizePx;
        newHeight = Math.round(maxSizePx / aspectRatio);
      } else {
        newHeight = maxSizePx;
        newWidth = Math.round(maxSizePx * aspectRatio);
      }
    }

    const manipulatedImage = await ImageManipulator.manipulateAsync(
      fileAsset.uri,
      [{ resize: { width: newWidth, height: newHeight } }],
      {
        compress: quality,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    return {
      uri: manipulatedImage.uri,
      fileName: manipulatedImage.uri.split('/').pop() || 'compressed.jpg',
      type: 'image',
      width: newWidth,
      height: newHeight,
    };
  } catch (error) {
    console.error('Error al comprimir la imagen:', error);
    return null;
  }
};

import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import ProgressHeader from './components/headerBar';
import styles from '../styles/stylesRegister';
import { MaterialIcons } from '@expo/vector-icons';
import { fileToBase64 } from '../tools/fileToBase64'; // Asegúrate de que la ruta sea correcta
import { compressImage } from '../tools/compressFile'; // Asegúrate de que la ruta sea correcta
import { UploadFileRequest } from "../interfaces/file/request";
import { uploadFile } from "../services/fileService"; // Asegúrate de que la ruta sea correcta
import { updateUser } from "../services/updateUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateUserRequest } from "../interfaces/user/updateRequest";
import { UpdateUserResponse } from "../interfaces/user/updateResponse";


// Simulación de servicios
const uploadImage = async (base64: string): Promise<boolean> => {
  // Crea el objeto que cumple con la interfaz UploadFileRequest
  const uploadRequest: UploadFileRequest = {
    fileName: `profile_${Date.now()}.jpg`, // Nombre único para la imagen
    fileType: 1, // Tipo de archivo
    base64Content: base64, // Imagen en formato base64
    idUser: await AsyncStorage.getItem('userId') ?? ""
  };

  // Llama al método uploadFile y devuelve la URL de la imagen subida
  const response = await uploadFile(uploadRequest);
  return response.Data.Result; // Asegúrate de que uploadFile devuelva un objeto con la propiedad "url"
};

const updateUserData = async (data: UpdateUserRequest): Promise<boolean> => {

  // Llama al método uploadFile y devuelve la URL de la imagen subida
  const response = await updateUser(data);
  return response.Data.result; // Asegúrate de que uploadFile devuelva un objeto con la propiedad "url"
};

export default function StepTwo() {
  const { email, password } = useLocalSearchParams<{ email: string; password: string }>();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState<ImagePicker.ImagePickerAsset | null>(null); // Cambia el tipo aquí
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]); // Guarda el asset completo
    }
  };

  const handleFinish = async () => {
    if (!fullName || !birthDate || !gender) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      let resultUpload;

      // Paso 1: Subir la imagen si existe
      if (profileImage) {
        // Reducir el tamaño del archivo
        const optimizedUri = await compressImage(profileImage as any);

        // Convertir a base64
        const base64 = await fileToBase64(optimizedUri as any);

        // Subir imagen en base64
        resultUpload = await uploadImage(base64 ?? "");

        if (!resultUpload) {
          throw new Error('Error al subir la imagen. Respuesta: ' + resultUpload);
        }
      }

      console.log('Usuario: ' + await AsyncStorage.getItem('userId'));
      const [day, month, year] = birthDate.split('/');
      const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) {
        console.error("Fecha inválida");
      } else {
        const isoDate = date.toISOString();
        console.log("Fecha válida:", isoDate);
      }

      // Paso 2: Guardar los datos en la base de datos
      const userData: UpdateUserRequest = {
        birthDate: new Date(isoDate).toISOString(),
        gender: gender,
        fullName: fullName,
        id: await AsyncStorage.getItem('userId') ?? ""
      };
      

      await updateUserData(userData);

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      router.replace('/auth/login1');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Ocurrió un error al registrar al usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressHeader step={2} totalSteps={3} />

      <Text style={styles.title}>Datos personales</Text>

      {/* Imagen de perfil */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handleSelectImage} style={styles.profileImageWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage.uri }} style={[styles.profileImage, { opacity: 0.7 }]} />
          ) : (
            <Image
              source={require('../../assets/images/default-user.png')}
              style={[styles.profileImage, { opacity: 0.7 }]}
            />
          )}
          <View style={styles.cameraIconContainer}>
            <MaterialIcons name="photo-camera" size={30} color="rgba(255, 255, 255, 0.9)" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Nombre completo */}
      <TextInput
        label="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        mode="flat"
      />

      {/* Fecha de nacimiento */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          label="Fecha de nacimiento (DD/MM/AAAA)"
          value={birthDate}
          style={styles.input}
          mode="flat"
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(selectedDate) => {
          const formattedDate = selectedDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          setBirthDate(formattedDate);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      {/* Género */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <TextInput
              label="Género"
              value={gender}
              style={styles.input}
              mode="flat"
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => { setGender('Hombre'); setMenuVisible(false); }} title="Hombre" />
        <Menu.Item onPress={() => { setGender('Mujer'); setMenuVisible(false); }} title="Mujer" />
        <Divider />
        <Menu.Item onPress={() => { setGender('Prefiero no decirlo'); setMenuVisible(false); }} title="Prefiero no decirlo" />
      </Menu>

      {/* Botón Finalizar */}
      <Button
        mode="contained"
        onPress={handleFinish}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Finalizar
      </Button>
    </ScrollView>
  );
}

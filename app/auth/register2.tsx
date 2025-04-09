import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from '../styles/stylesRegister';
import { MaterialIcons } from '@expo/vector-icons';
import { fileToBase64 } from '../tools/fileToBase64';
import { compressImage } from '../tools/compressFile';
import { UploadFileRequest } from "../interfaces/file/request";
import { uploadFile } from "../services/fileService";
import { updateUser } from "../services/updateUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateUserRequest } from "../interfaces/user/updateRequest";

const uploadImage = async (base64: string): Promise<boolean> => {
  const uploadRequest: UploadFileRequest = {
    fileName: `profile_${Date.now()}.jpg`,
    fileType: 1,
    base64Content: base64,
    idUser: await AsyncStorage.getItem('userId') ?? ""
  };

  const response = await uploadFile(uploadRequest);
  return response.Data.Result;
};

const updateUserData = async (data: UpdateUserRequest): Promise<boolean> => {
  const response = await updateUser(data);
  return response.Data.result;
};

export default function StepTwo() {
  const { email, password } = useLocalSearchParams<{ email: string; password: string }>();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
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
      setProfileImage(result.assets[0]);
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

      if (profileImage) {
        const optimizedUri = await compressImage(profileImage as any);
        const base64 = await fileToBase64(optimizedUri as any);
        resultUpload = await uploadImage(base64 ?? "");

        if (!resultUpload) {
          throw new Error('Error al subir la imagen. Respuesta: ' + resultUpload);
        }
      }

      const [day, month, year] = birthDate.split('/');
      const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

      const userData: UpdateUserRequest = {
        birthDate: isoDate,
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
      {/* Botón para retroceder */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="#555" />
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>
      <View style={styles.contentInfoData}>
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
        </View >
    </ScrollView>
    
  );
}

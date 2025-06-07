// src/screens/StepTwo.tsx
import React, { useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../../styles/stylesRegister';
import CountrySelector from '../../components/CountrySelector';
import ImageUploader from '../../components/uploadImage';

import { fileToBase64 } from '../../tools/fileToBase64';
import { compressImage } from '../../tools/compressFile';
import { uploadFile } from '../../services/fileService';
import { updateUser } from '../../services/updateUser';
import { UploadFileRequest } from '../../interfaces/file/request';
import { UpdateUserRequest } from '../../interfaces/user/updateRequest';

const uploadImage = async (base64: string): Promise<boolean> => {
  const uploadRequest: UploadFileRequest = {
    fileName: `profile_${Date.now()}.jpg`,
    fileType: 1,
    base64Content: base64,
    idUser: (await AsyncStorage.getItem('userId')) ?? ""
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
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleFinish = async () => {
    if (!fullName || !username || !birthDate || !gender || !country) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      // 1) Subir imagen si hay
      if (profileImage) {
        const optimizedUri = await compressImage(profileImage as any);
        const base64 = await fileToBase64(optimizedUri as any);
        const ok = await uploadImage(base64 ?? '');
        if (!ok) throw new Error('Error al subir la imagen');
      }

      // 2) Formatear fecha
      const [day, month, year] = birthDate.split('/');
      const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

      // 3) Llamar al servicio
      const userData: UpdateUserRequest = {
        id: (await AsyncStorage.getItem('userId')) ?? '',
        fullName,
        username,
        birthDate: isoDate,
        gender,
        countryCode: country
      };
      await updateUserData(userData);

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      router.replace('/auth/screens/login1');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={40} // separa un poquito más del teclado
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
          <View>
            {/* Back */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="#555" />
              <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>

            <View style={styles.contentInfoData}>
              <Text style={styles.title}>Datos personales</Text>

              {/* Imagen - componente externo */}
              <ImageUploader profileImage={profileImage as any} setProfileImage={setProfileImage as any} />

              {/* Nombre completo */}
              <TextInput
                label="Nombre completo"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                mode="flat"
              />

              {/* Nombre de usuario */}
              <TextInput
                label="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
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
                onConfirm={(date) => {
                  const formatted = date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  });
                  setBirthDate(formatted);
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

              {/* País */}
              <CountrySelector
                selectedCountry={country}
                onCountryChange={setCountry}
              />

              {/* Finalizar */}
              <Button
                mode="contained"
                onPress={handleFinish}
                style={styles.button}
                loading={loading}
                disabled={loading}
              >
                Finalizar
              </Button>
            </View>
          </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>      
    </KeyboardAvoidingView>
  );
}

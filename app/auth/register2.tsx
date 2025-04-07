import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import ProgressHeader from './components/headerBar';
import styles from '../styles/stylesRegister';
import { MaterialIcons } from '@expo/vector-icons';

export default function StepTwo() {
  const { email, password } = useLocalSearchParams<{ email: string; password: string }>();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
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
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleFinish = async () => {
    if (!profileImage || !fullName || !birthDate || !gender) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const userData = {
      email,
      password,
      fullName,
      birthDate,
      gender,
      profileImage,
    };

    console.log(userData);
    Alert.alert('Éxito', 'Usuario registrado. Continúa al login.');
    router.replace('/auth/login1');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressHeader step={2} totalSteps={3} />

      <Text style={styles.title}>Datos personales</Text>

      {/* Imagen de perfil */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handleSelectImage} style={styles.profileImageWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={[styles.profileImage, { opacity: 0.7 }]} />
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

      {/* Género con Menu */}
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

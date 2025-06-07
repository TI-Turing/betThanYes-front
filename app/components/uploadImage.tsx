import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface ImageUploaderProps {
  profileImage: ImagePicker.ImagePickerAsset | null;
  setProfileImage: (image: ImagePicker.ImagePickerAsset | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ profileImage, setProfileImage }) => {
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

  return (
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
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
});

export default ImageUploader;
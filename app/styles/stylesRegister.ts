import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    flexGrow: 1,
    padding: 16,
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#f9f9f9',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  rulesContainer: {
    marginBottom: 20,
  },
  rule: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageWrapper: {
    position: 'relative', // Necesario para posicionar el ícono de forma absoluta
    width: 100,
    height: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  cameraIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }], // Centra el ícono
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 10,
  },
  backButton: {
    position: 'absolute', // Posiciona el botón de forma absoluta
    top: 20, // Ajusta la distancia desde la parte superior
    left: 20, // Ajusta la distancia desde la izquierda
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  content:{
    marginTop: 90
  },
  
  contentInfoData:{
    marginTop: 75
  },
});

export default styles;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      backgroundColor: '#121212',
    },
    title: {
      fontSize: 28,
      marginBottom: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#fff',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingBottom: 4,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    button: {
      marginTop: 12,
      paddingVertical: 6,
    },
    registerText: {
      marginTop: 24,
      textAlign: 'center',
      color: '#007bff',
    },
    greeting: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    forgotPassword: {
      marginTop: 10,
      color: '#2196F3',
      textAlign: 'center',
      fontSize: 14,
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
    
  });
  
  export default styles;
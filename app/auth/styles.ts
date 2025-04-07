import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      marginBottom: 24,
      textAlign: 'center',
      fontWeight: 'bold',
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
  });
  
  export default styles;
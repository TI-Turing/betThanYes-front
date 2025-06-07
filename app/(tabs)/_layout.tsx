import { Tabs } from 'expo-router';
import React, { useState, createContext, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import  LogoutOption  from '../auth/screens/logout'; // Asegúrate de que la ruta sea correcta

// Contexto para manejar las opciones dinámicas del menú
const MenuContext = createContext({
  dynamicOptions: [] as { label: string; action: () => any }[], // Cambia el tipo para reflejar las opciones dinámicas
  setDynamicOptions: (options: { label: string; action: () => any }[]) => {}, // Solo un argumento
});

export default function TabLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-300)); // Animación para el menú
  const [dynamicOptions, setDynamicOptions] = useState<{ label: string; action: () => any }[]>([]); // Opciones dinámicas

  // Función para abrir el menú
  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  return (
    <MenuContext.Provider value={{ dynamicOptions, setDynamicOptions }}>
      <View style={styles.container}>
        <Tabs
          screenOptions={{
            headerShown: true, // Muestra el header
            headerTitle: () => (
              <Text style={styles.headerTitle}>BetThanYes</Text>
            ), // Título del header
            headerRight: () => (
              <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                <FontAwesome name="bars" size={24} color="#ffffff" />
              </TouchableOpacity>
            ), // Botón del menú en el header
            headerStyle: {
              backgroundColor: '#121212', // Fondo oscuro para el header
              borderBottomWidth: 1, // Línea inferior
              borderBottomColor: '#3b3636', // Gris oscuro para la línea
              height: 45, // Reduce la altura del header
            },
            headerTitleAlign: 'left', // Alinea el título a la izquierda
            tabBarStyle: {
              backgroundColor: '#121212', // Fondo oscuro
              borderTopWidth: 1, // Línea horizontal
              borderColor: '#3b3636', // Gris más claro para probar
              elevation: 0, // Sin sombra en Android
              paddingVertical: 10, // Agrega espacio arriba y abajo para centrar los íconos
            },
            tabBarActiveTintColor: '#ffffff', // Azul activo
            tabBarShowLabel: false, // Oculta los títulos de las opciones
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="checkList"
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="check-circle" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="goals"
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="trophy" size={24} color={color} />,
            }}
          />
        </Tabs>

        {/* Menú desplegable */}
        {menuVisible && (
          <Modal transparent={true} animationType="none" visible={menuVisible}>
            <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
            <Animated.View style={[styles.menuContainer, { right: menuAnimation }]}>
              {/* Parte dinámica del menú */}
              <View style={styles.dynamicMenu}>
                <Text style={styles.menuTitle}></Text>
                {dynamicOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                      option.action(); // Ejecuta la acción de la opción
                      closeMenu(); // Cierra el menú
                    }}
                  >
                    <Text style={styles.menuText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Parte estática del menú */}
              <View style={styles.staticMenu}>
                <Text style={styles.menuTitle}>Opciones estáticas</Text>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Configuración</Text>
                </TouchableOpacity>
                <LogoutOption />
              </View>
            </Animated.View>
          </Modal>
        )}
      </View>
    </MenuContext.Provider>
  );
}

// Hook para usar el contexto del menú
export const useMenu = () => useContext(MenuContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // Texto blanco para el header
  },
  menuButton: {
    marginRight: 15, // Espaciado a la derecha
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 220,
    backgroundColor: '#121212',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dynamicMenu: {
    flex: 1, // Ocupa todo el espacio disponible
    marginBottom: 20,
  },
  staticMenu: {
    borderTopWidth: 1,
    borderTopColor: '#3b3636',
    paddingTop: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

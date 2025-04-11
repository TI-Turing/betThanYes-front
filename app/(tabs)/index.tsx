import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, ProgressBar, FAB } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const HomeScreen = () => {
  const fraseMotivacional = "Cada día es una nueva oportunidad para mejorar.";
  const rutinaProgreso = 0.7; // 70% completado
  const objetivoProgreso = 0.5; // 50% completado
  const postPopular = {
    titulo: "Cómo crear hábitos duraderos",
    contenido: "Descubre estrategias efectivas para mantener tus hábitos...",
  };
  const tareasVencidas = 0; // Cambia esto dinámicamente según tu lógica
  const { colors } = useTheme();


  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Frase Motivacional */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={[{ color: colors.onBackground },styles.motivationalText]}>{fraseMotivacional}</Text>
          </Card.Content>
        </Card>

        {/* Estado de Rutina Diaria */}
        <Card style={styles.card}>
          <Card.Title title="Rutina Diaria" />
          <Card.Content>
            <ProgressBar progress={rutinaProgreso} color="#4CAF50" />
            <Text style={[{ color: colors.onBackground }, styles.progressText]}>
              {Math.round(rutinaProgreso * 100)}% completado
              </Text>

            {/* Tareas vencidas */}
            <Text style={[styles.taskWarning, tareasVencidas > 0 && styles.taskWarningActive]}>
              {tareasVencidas > 0
                ? `${tareasVencidas} tarea${tareasVencidas > 1 ? 's' : ''} vencida${tareasVencidas > 1 ? 's' : ''}`
                : "No hay tareas vencidas"}
            </Text>
          </Card.Content>
        </Card>


        {/* Progreso de Objetivos */}
        <Card style={styles.card}>
          <Card.Title title="Progreso de Objetivos" />
          <Card.Content>
            <ProgressBar progress={objetivoProgreso} color="#FF9800" />
            <Text style={[{ color: colors.onBackground },styles.progressText]}>{Math.round(objetivoProgreso * 100)}% completado</Text>
          </Card.Content>
        </Card>

        {/* Post Popular del Foro */}
        <Card style={styles.card}>
          <Card.Title title="Post Popular" />
          <Card.Content>
            <Text style={[{ color: colors.onBackground }, styles.postTitle]}>{postPopular.titulo}</Text>
            <Text style={[{ color: colors.onBackground }]} numberOfLines={2}>{postPopular.contenido}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => console.log('Ver más')}>Ver más</Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      {/* Botón Flotante */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Acción rápida')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskWarning: {
    marginTop: 8,
    textAlign: 'center',
    color: '#bcc2c2', // Gris si no hay tareas vencidas
  },
  taskWarningActive: {
    color: 'red', // Rojo si hay tareas vencidas
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#1f2020',
  },
  motivationalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
  },
});

export default HomeScreen;

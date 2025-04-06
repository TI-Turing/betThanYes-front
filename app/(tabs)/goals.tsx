import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import  * as Progress from 'react-native-progress';


const SmartGoalScreen = () => {
  const [goal, setGoal] = useState('');
  const [reason, setReason] = useState('');
  const [subGoals, setSubGoals] = useState(['']);
  const [timeLimit, setTimeLimit] = useState('');
  const [progress, setProgress] = useState(0);

  const handleAddSubGoal = () => {
    setSubGoals([...subGoals, '']);
  };

  const handleSubGoalChange = (text: string, index: number) => {
    const updatedSubGoals = [...subGoals];
    updatedSubGoals[index] = text;
    setSubGoals(updatedSubGoals);
  };

  const handleCompleteTask = () => {
    const completed = subGoals.filter((task) => task.trim() !== '').length;
    const newProgress = completed / subGoals.length;
  
    // Evita re-render innecesario
    if (newProgress !== progress) {
      setProgress(newProgress);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Define tu Meta SMART</Text>

      <Text style={styles.label}>Meta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu meta específica"
        value={goal}
        onChangeText={setGoal}
      />

      <Text style={styles.label}>Razón/Relevancia:</Text>
      <TextInput
        style={styles.input}
        placeholder="¿Por qué es importante esta meta?"
        value={reason}
        onChangeText={setReason}
      />

      <Text style={styles.label}>Submetas o Tareas:</Text>
      {subGoals.map((subGoal, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Tarea ${index + 1}`}
          value={subGoal}
          onChangeText={(text) => handleSubGoalChange(text, index)}
        />
      ))}
      <Button title="Añadir Tarea" onPress={handleAddSubGoal} />

      <Text style={styles.label}>Límite de Tiempo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha límite (e.g., 31/12/2025)"
        value={timeLimit}
        onChangeText={setTimeLimit}
      />

      <Text style={styles.label}>Progreso:</Text>
      
      <Progress.Bar progress={progress} width={370} color="#2196F3"/>

      <Button title="Completar una tarea" onPress={handleCompleteTask} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default SmartGoalScreen;

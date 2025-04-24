import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Button,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons"; // Para el ícono de 3 rayitas y el ícono de chulito
import { CheckBox } from 'react-native-elements';
import  styles  from "../styles/stylesRoutine"; // Importa tus estilos desde el archivo correspondiente
import { createRoutine } from '../services/routine/create'
import { GetAllRoutinesByUserId } from "../services/routine/getAll"; // Importa el servicio
import  ProfileScreen  from "../auth/logout"; // Asegúrate de que la ruta sea correcta
import  ProgressRoutine  from "../components/progressRoutine"; // Asegúrate de que la ruta sea correcta
import { useMenu } from "./_layout"; // Importa el contexto del menú global
import { useTheme } from 'react-native-paper';
import { Routine } from "../interfaces/routine/routine"; // Asegúrate de que la ruta sea correcta

// Definición del tipo de tarea (para TypeScript)
type Task = {
  id: string; // Identificador único de la tarea
  title: string; // Título de la tarea
  time: string; // Hora asociada a la tarea
  completed: boolean; // Indica si la tarea está completada
  type: number; // Tipo de tarea (1 = responsabilidad, 2 = hábito)
};
 
export default function Checklist() {
  const { setDynamicOptions } = useMenu(); // Usa el contexto del menú global

  // Estado para almacenar las rutinas
  const [routines, setRoutines] = useState<Routine[]>([]);

  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Estado para almacenar la hora actual
  const [currentTime, setCurrentTime] = useState("");

  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false); // Modal de tareas

  // Estado para indicar si se está editando una tarea
  const [isEditing, setIsEditing] = useState(false);

  // Estado para el título de una nueva tarea o tarea editada
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Estado para la hora de una nueva tarea o tarea editada
  const [newTaskTime, setNewTaskTime] = useState(new Date());

  // Estado para mostrar u ocultar el selector de hora
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Estado para manejar el menú contextual de opciones en una tarea
  const [menuVisible, setMenuVisible] = useState<{
    taskId: string | null;
    position: { top: number; left: number } | null;
  }>({ taskId: null, position: null });

  // Estado para la tarea seleccionada actualmente (en edición o menú)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Estado para la animación del menú
  const [menuAnimation] = useState(new Animated.Value(0));

  // Estado para controlar la visibilidad del modal de rutina
  const [routineModalVisible, setRoutineModalVisible] = useState(false);

  // Estado para los campos del formulario de rutina
  const [routineTitle, setRoutineTitle] = useState("");
  const [isMainRoutine, setIsMainRoutine] = useState(false);

  // Efecto para cargar las tareas almacenadas al iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks) as Task[]);
        }
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    loadTasks();
  }, []);

  // Efecto para guardar las tareas cada vez que cambian
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error al guardar tareas:", error);
      }
    };
    saveTasks();
  }, [tasks]);

  // Efecto para actualizar la hora actual cada minuto
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000); // Actualiza cada minuto
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  useEffect(() => {
    // Establece las opciones dinámicas para esta pantalla
    setDynamicOptions([
      {
        label: "Nueva rutina",
        action: () => setModalVisible(true),
      },
      {
        label: "Seleccionar rutina",
        action: () => selectRoutineModal(),
      },
      {
        label: "Configurar rutinas",
        action: () => console.log("Eliminar tarea seleccionada"),
      },
    ]);
  }, []);

  const selectRoutineModal = () => {
    setRoutineModalVisible(true); // Abre el modal de selección de rutina
  };

  // Llama al servicio al montar el componente
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const userId = await SecureStore.getItem('userId')?? ''; // Reemplaza con el ID del usuario actual
        console.log("ID de usuario:", userId);
        const routinesData = await GetAllRoutinesByUserId(userId);
        setRoutines(routinesData); // Guarda las rutinas en el estado
        console.log("Rutinas obtenidas:", routinesData);
      } catch (error) {
        console.error("Error al obtener las rutinas:", error);
      }
    };

    fetchRoutines();
  }, []); // Ejecuta solo al montar el componente

  // Alterna el estado completado de una tarea
  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Comprueba si una hora ya pasó comparada con la actual
  const isPastTime = (taskTime: string) => {
    const now = new Date();
    const [taskHours, taskMinutes] = taskTime.split(":").map(Number);
    const taskDate = new Date();
    taskDate.setHours(taskHours, taskMinutes, 0, 0);

    return now > taskDate;
  };

  // Encuentra el índice del divisor para separar tareas futuras de pasadas
  const findDividerIndex = () => {
    const index = tasks.findIndex((task) => !isPastTime(task.time));
    return index === -1 ? tasks.length : index;
  };

  const dividerIndex = findDividerIndex(); // Índice del divisor

  // Abre el modal para editar una tarea específica
  const openModalForEdit = (task: Task) => {
    setSelectedTask(task);
    setNewTaskTitle(task.title);
    setNewTaskTime(new Date(`1970-01-01T${task.time}:00`));
    setIsEditing(true);
    setModalVisible(true);
  };

  // Guarda una nueva tarea o edita una existente
  const handleSaveTask = () => {
    const hours = String(newTaskTime.getHours()).padStart(2, "0");
    const minutes = String(newTaskTime.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    if (isEditing && selectedTask) {
      // Actualiza una tarea existente
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id
          ? { ...task, title: newTaskTitle, time: formattedTime }
          : task
      );
      setTasks(updatedTasks);
    } else {
      // Crea una nueva tarea
      const newTask: Task = {
        id: String(Date.now()),
        title: newTaskTitle,
        time: formattedTime,
        completed: false,
        type: 1,
      };
      setTasks((prevTasks) =>
        [...prevTasks, newTask].sort((a, b) => {
          const [aHours, aMinutes] = a.time.split(":").map(Number);
          const [bHours, bMinutes] = b.time.split(":").map(Number);
          return aHours !== bHours ? aHours - bHours : aMinutes - bMinutes;
        })
      );
    }

    // Reinicia los valores del formulario
    setNewTaskTitle("");
    setNewTaskTime(new Date());
    setSelectedTask(null);
    setIsEditing(false);
    setModalVisible(false);
  };

  // Elimina una tarea específica
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setMenuVisible({ taskId: null, position: null });
  };


  // Estilo animado para el menú
  const menuStyle = {
    transform: [
      {
        translateX: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0], // Desde fuera de la pantalla (derecha) hasta su posición final
        }),
      },
    ],
  };

  // Función para guardar la rutina
  const handleSaveRoutine = async () => {
    try {
      // Llama al servicio con los datos de la rutina
      const response = await createRoutine({
        userId: "CF854FFA-5465-4E26-AE67-BA70BC3FDA58", // Reemplaza con el ID del usuario actual
        Name: routineTitle,
        isDefault: isMainRoutine,
      });

      console.log("Rutina creada exitosamente:", response);

      // Reinicia los valores del formulario
      setRoutineTitle("");
      setIsMainRoutine(false);
      setRoutineModalVisible(false);

      // Aquí puedes agregar lógica adicional, como actualizar la lista de rutinas
    } catch (error) {
      console.error("Error al crear la rutina:", error);
      alert("Hubo un error al crear la rutina. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setMenuVisible({ taskId: null, position: null }); // Oculta el menú contextual
        Keyboard.dismiss(); // Oculta el teclado si está abierto
      }}
    >
      <View style={styles.container}>
        {/* Lista de tareas */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const isPastDue = isPastTime(item.time) && !item.completed;
            const isBelowDivider = index >= dividerIndex;

            return (
              <View>
                {/* Divisor para tareas futuras y pasadas */}
                {index === dividerIndex && (
                  <View style={styles.dividerContainer}>
                    <View style={styles.divider}>
                      <Text style={styles.dividerText}>{currentTime}</Text>
                    </View>
                  </View>
                )}

                {/* Elemento de tarea */}
                <TouchableOpacity
                  style={[
                    styles.task,
                    isBelowDivider
                      ? styles.futureTask
                      : isPastDue && styles.pastDueTask,
                    item.completed && styles.completedTask,
                  ]}
                  onPress={() => toggleTask(item.id)} // Alterna estado completado
                  onLongPress={(event) => {
                    const { pageX, pageY } = event.nativeEvent;
                    setMenuVisible({
                      taskId: item.id,
                      position: { top: pageY, left: pageX },
                    });
                    setSelectedTask(item);
                  }}
                >
                  <View style={styles.taskContent}>
                    {/* Contenedor para el texto */}
                    <View style={styles.taskTextContainer}>
                      <Text style={styles.taskTime}>{item.time}</Text>
                      <Text
                        style={[
                          styles.taskText,
                          (item.completed || isPastDue) && styles.completedText, // Aplica gris a tareas completadas o vencidas
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                    {/* Ícono de chulito para tareas completadas */}
                    {item.completed && (
                      <FontAwesome
                        name="check-circle"
                        size={20}
                        color="#FFFFFF" // Ícono blanco
                        style={styles.completedIcon}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        {/* Botón para añadir nueva tarea */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setIsEditing(false);
            setNewTaskTitle("");
            setNewTaskTime(new Date());
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Modal para añadir/editar tareas */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {isEditing ? "Editar Tarea" : "Nueva Tarea"}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Título de la tarea"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
              />
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.timePickerButton}
              >
                <Text style={styles.timePickerText}>
                  {newTaskTime
                    ? newTaskTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "Seleccionar Hora"}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={newTaskTime}
                  mode="time"
                  is24Hour={true}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) => {
                    setShowTimePicker(false);
                    if (selectedDate) setNewTaskTime(selectedDate);
                  }}
                />
              )}
              <View style={styles.modalButtons}>
                <Button
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                />
                <Button title="Guardar" onPress={handleSaveTask} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Menú contextual para opciones de tarea */}
        {menuVisible.taskId && menuVisible.position && (
          <View
            style={[
              styles.menu,
              { top: menuVisible.position.top, left: menuVisible.position.left },
            ]}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible({ taskId: null, position: null });
                openModalForEdit(selectedTask!);
              }}
            >
              <TouchableOpacity style={styles.contextMenuItem}>
                <Text>Editar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => deleteTask(menuVisible.taskId!)}
            >
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal para añadir/editar rutina */}
        <Modal
          visible={routineModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setRoutineModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nueva Rutina</Text>

              {/* Campo para el título de la rutina */}
              <TextInput
                style={styles.input}
                placeholder="Título de la rutina"
                value={routineTitle}
                onChangeText={setRoutineTitle}
              />

              {/* Checkbox para marcar como principal */}
              <View style={styles.checkboxContainer}>
                <CheckBox
                  checked={isMainRoutine}
                  onPress={() => setIsMainRoutine(!isMainRoutine)} // Alterna el estado
                />
                <Text style={styles.checkboxLabel}>Marcar como principal</Text>
              </View>

              {/* Botones de cancelar y guardar */}
              <View style={styles.modalButtons}>
                <Button
                  title="Cancelar"
                  onPress={() => setRoutineModalVisible(false)}
                />
                <Button title="Guardar" onPress={handleSaveRoutine} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal para listar las rutinas */}
        <Modal
          visible={routineModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setRoutineModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar Rutina</Text>

              {/* Lista de rutinas */}
              <FlatList
                data={routines}
                keyExtractor={(item) => item.Id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.routineItem}
                    onPress={() => {
                      console.log("Rutina seleccionada:", item.RoutineName);
                      setRoutineModalVisible(false); // Cierra el modal al seleccionar una rutina
                    }}
                  >
                    <Text style={styles.routineText}>{item.RoutineName}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Botón para cerrar el modal */}
              <Button title="Cerrar" onPress={() => setRoutineModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
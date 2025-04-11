import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    padding: 10,
  },
  task: {
    backgroundColor: "#1F1F1F",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3B82F6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedTask: {
    backgroundColor: "#3B82F6",
  },
  pastDueTask: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
  },
  futureTask: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Alinea el texto a la izquierda y el ícono al borde derecho
    width: "100%", // Asegúrate de que ocupe todo el ancho disponible
  },
  taskTextContainer: {
    flexDirection: "row", // Alinea la hora y el texto horizontalmente
    alignItems: "center", // Centra verticalmente la hora y el texto
  },
  taskTime: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 10, // Espaciado entre la hora y el texto
  },
  taskText: {
    color: "#FFFFFF", // Blanco para tareas normales
    fontSize: 16,
    fontWeight: "bold",
  },
  completedText: {
    color: "#FFFFFF", // Gris claro para tareas completadas o vencidas
  },
  futureText: {
    color: "#60A5FA",
  },
  dividerContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "#3B82F6",
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  dividerText: {
    position: "absolute",
    backgroundColor: "#121212",
    paddingHorizontal: 5,
    fontSize: 16,
    color: "#3B82F6",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3B82F6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  timePickerText: {
    fontSize: 16,
    color: "#333",
  },
  menu: {
    position: "absolute",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  contextMenuItem: {
    padding: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "60%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  completedIcon: {
    marginRight: 0, // Elimina cualquier margen derecho
  },
});

export default styles;

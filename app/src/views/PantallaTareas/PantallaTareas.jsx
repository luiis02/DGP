import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

import { obtenerPictograma } from "../../api/apiArasaac";
import Layaout from "../../components/Layaout/Layaout";
import * as apiTasks from "../../api/apiTarea";

function PantallaTareas({ route }) {
  const { student } = route.params || {};
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageMap, setImageMap] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const tasksPerPage = 2; // Número máximo de tareas por página
  const navigation = useNavigation();
  const pictograma = {
    atras: "38249/38249_2500.png",
  };
  const [urlAtras, setUrlAtras] = useState(null);

  function formatDate(dateString) {
    return format(new Date(dateString), "dd/MM/yyyy");
  }

  const fetchBackPictogram = async () => {
    const respuesta = await obtenerPictograma(pictograma.atras);
    if (respuesta) {
      setUrlAtras(respuesta);
    } else {
      Alert.alert("Error al obtener el pictograma.");
    }
  };

  const fetchStudentTasks = async () => {
    try {
      // Por ahora solo queremos las tareas que no han sido completadas:
      const tasks = await apiTasks.getTasksExcludeCompleted(
        student.id,
        "not_started",
        true
      );

      const transformedData = tasks.map((item) => ({
        id: item[0],
        name: item[1],
        description: item[2],
        due_date: item[3],
        priority: item[4],
        status: item[5],
        student_id: item[6],
        image_url: item[7],
        created_at: item[8],
        updated_at: item[9],
      }));

      const imageMap = {
        "microondas.png": require("../../../assets/tareas/microondas.png"),
        "camiseta_manga_larga.png": require("../../../assets/tareas/camiseta_manga_larga.png"),
        "mochila.png": require("../../../assets/tareas/mochila.png"),
        "regar.png": require("../../../assets/tareas/regar.png"),
        "sentado_en_la_mesa.png": require("../../../assets/tareas/sentado_en_la_mesa.png"),
        "vaso_agua.png": require("../../../assets/tareas/vaso_agua.png"),
        "lavar_platos.png": require("../../../assets/tareas/lavar_platos.png"),
      };
      setImageMap(imageMap);

      setTasks(transformedData);
    } catch (error) {
      console.error("Error al obtener tareas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() =>
        navigation.navigate("Step", {
          taskId: item.id,
          taskName: item.name,
          studentContentPref: student.pref_contenido,
          student: student,
        })
      }
    >
      <Image
        source={imageMap[item.image_url]} // Mapea la imagen desde el identificador
        style={styles.imageTask}
      />
      <Text style={styles.taskName}>{item.name}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskDetails}>
        Fecha límite: {formatDate(item.due_date)}
      </Text>
    </TouchableOpacity>
  );

  useFocusEffect(
    useCallback(() => {
      fetchBackPictogram();
      fetchStudentTasks();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      // Redirige a la pantalla deseada
      navigation.navigate("HomeAlumno", { alumno: student });
      return true; // Evita el comportamiento predeterminado del botón de atrás
    };

    // Añade el listener al botón de atrás
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Limpia el listener cuando el componente se desmonte
    return () => backHandler.remove();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Lógica de paginación
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex); // Tareas visibles

  return (
    <Layaout>
      <View style={styles.header}>
        {Platform.OS !== "android" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HomeAlumno", { alumno: student })
            }
          >
            {urlAtras && (
              <Image
                source={{ uri: urlAtras }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.titleHeader}>Tareas por pasos</Text>
      </View>

      <View style={styles.container}>
        {currentTasks.length > 0 && (
          <>
            <FlatList
              data={currentTasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTaskItem}
              contentContainerStyle={styles.listContainer}
            />
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[
                  styles.button,
                  currentPage === 1 && styles.disabledButton, // Aplica estilo si está deshabilitado
                ]}
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1} // Deshabilitado en la primera página
              >
                <Image
                  source={require("../../../assets/boton_anterior.png")}
                  style={[
                    styles.image,
                    currentPage === 1 && styles.disabledImage, // Cambia la opacidad del icono
                  ]}
                />
                <Text
                  style={[
                    styles.buttonText,
                    currentPage === 1 && styles.disabledButtonText, // Cambia el color del texto
                  ]}
                >
                  Anterior
                </Text>
              </TouchableOpacity>

              <Text style={styles.pageIndicator}>
                Página {currentPage} de {Math.ceil(tasks.length / tasksPerPage)}
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  endIndex >= tasks.length && styles.disabledButton, // Aplica estilo si está deshabilitado
                ]}
                onPress={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(tasks.length / tasksPerPage))
                  )
                }
                disabled={endIndex >= tasks.length} // Deshabilitado en la última página
              >
                <Image
                  source={require("../../../assets/boton_siguiente.png")}
                  style={[
                    styles.image,
                    endIndex >= tasks.length && styles.disabledImage, // Cambia la opacidad del icono
                  ]}
                />
                <Text
                  style={[
                    styles.buttonText,
                    endIndex >= tasks.length && styles.disabledButtonText, // Cambia el color del texto
                  ]}
                >
                  Siguiente
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {currentTasks.length == 0 && (
          <Text style={{ fontSize: 20, color: "gray", paddingLeft: 20 }}>
            No hay tareas por el momento
          </Text>
        )}
      </View>
    </Layaout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  listContainer: {
    padding: 16,
  },
  taskItem: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageTask: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 12,
  },
  taskName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  taskDescription: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  taskDetails: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  pageIndicator: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: 150,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  disabledButtonText: {
    color: "#a9a9a9",
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  disabledImage: {
    opacity: 0.5,
  },
});

export default PantallaTareas;
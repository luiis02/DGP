import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as apiTasks from "../../api/apiTarea";
import { useNavigation } from "@react-navigation/native";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { Audio } from "expo-av";

import { obtenerPictograma } from "../../api/apiArasaac";
import Layaout from "../../components/Layaout/Layaout";

function PantallaPasoTarea({ route }) {
  const { taskId, taskName, studentContentPref, student } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [taskSteps, setTaskSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [feedbackOpacity] = useState(new Animated.Value(0)); // Control de la animación de feedback
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pictograma = {
    atras: "38249/38249_2500.png",
  };
  const [urlAtras, setUrlAtras] = useState(null);
  const [sound, setSound] = useState();
  const audioMap = {
    "audio_example.mp3": require("../../../assets/tareas/audio_example.mp3"),
  };
  const pictogramMap = {
    "microondas.png": require("../../../assets/tareas/microondas.png"),
    "camiseta_manga_larga.png": require("../../../assets/tareas/camiseta_manga_larga.png"),
    "mochila.png": require("../../../assets/tareas/mochila.png"),
    "regar.png": require("../../../assets/tareas/regar.png"),
    "sentado_en_la_mesa.png": require("../../../assets/tareas/sentado_en_la_mesa.png"),
    "vaso_agua.png": require("../../../assets/tareas/vaso_agua.png"),
    "lavar_platos.png": require("../../../assets/tareas/lavar_platos.png"),
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Oculta el modal
    navigation.goBack();
  };

  const fetchBackPictogram = async () => {
    const respuesta = await obtenerPictograma(pictograma.atras);
    if (respuesta) {
      setUrlAtras(respuesta);
    } else {
      Alert.alert("Error al obtener el pictograma.");
    }
  };

  const fetchTaskSteps = async () => {
    try {
      const data = await apiTasks.getTaskSteps(taskId);
      console.log(data);
      const transformedData = data.map((item, index) => ({
        id: item['id'],
        task_id: item['task_id'],
        order: index + 1, // Orden de cada paso
        content: `Paso ${index + 1}: ${item['content']}`,
        status: item['status'],
        audio_url: item['audio_url'],
        video_url: item['video_url'],
        pictogram_url: item['pictogram_url'],
        created_at: item['created_at'],
        updated_at: item['updated_at'],
      }));

      setTaskSteps(transformedData);
    } catch (error) {
      console.error("Error al obtener los pasos de la tarea:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTaskSteps();
      setLoading(false);
    };

    fetchBackPictogram();
    fetchData();
  }, []);

  useEffect(() => {
    if (taskSteps.length > 0) {
      const firstUncompletedIndex = taskSteps.findIndex(
        (step) => step.status !== "completed"
      );

      const index = firstUncompletedIndex === -1 ? 0 : firstUncompletedIndex;

      const hasCompletedSteps = taskSteps.some(
        (step) => step.status === "completed"
      );

      if (!hasCompletedSteps) {
        console.log("Iniciando tarea, no hay pasos completados.");
        apiTasks.startTask(taskId);
      }

      setCurrentIndex(index);
      setCurrentStep(taskSteps[index]);
    }
  }, [taskSteps]);

  useEffect(() => {
    const backAction = () => {
      // Redirige a la pantalla deseada
      navigation.navigate("Tasks", { student: student });
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

  // Extraer el ID del video de YouTube
  const getYouTubeVideoId = (url) => {
    if (url) {
      try {
        const urlObj = new URL(url);

        // Caso: URL estándar de YouTube
        if (
          urlObj.hostname.includes("youtube.com") &&
          urlObj.pathname === "/watch"
        ) {
          return urlObj.searchParams.get("v");
        }

        // Caso: URL corta de YouTube (youtu.be)
        if (urlObj.hostname.includes("youtu.be")) {
          return urlObj.pathname.substring(1);
        }

        // Caso: Shorts de YouTube
        if (
          urlObj.hostname.includes("youtube.com") &&
          urlObj.pathname.startsWith("/shorts")
        ) {
          return urlObj.pathname.split("/")[2];
        }

        return null; // Si no se cumple ninguna condición
      } catch (error) {
        console.error("Error al extraer el ID del video:", error.message);
        return null;
      }
    }
  };

  const playAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        audioMap[currentStep.audio_url]
      );

      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Error al reproducir el audio:", error);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  // Limpiar el sonido cuando el componente se desmonta
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Función para mostrar retroalimentación positiva
  const showFeedback = (message) => {
    Animated.sequence([
      Animated.timing(feedbackOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!currentStep) {
    return (
      <View style={styles.container}>
        <Text style={styles.noStepsText}>
          No hay pasos disponibles para esta tarea.
        </Text>
      </View>
    );
  }

  const videoId = getYouTubeVideoId(currentStep.video_url);

  return (
    <Layaout>
      <View style={styles.header}>
        {Platform.OS !== "android" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Tasks", { student: student })}
          >
            {urlAtras && (
              <Image
                source={{ uri: urlAtras }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.titleHeader}>Pasos de la tarea '{taskName}'</Text>
      </View>

      <View style={styles.container}>
        <Text
          style={[
            styles.stepText,
            currentStep.status === "completed"
              ? styles.completedStepText
              : null,
          ]}
        >
          {currentStep.content}
        </Text>
        <Animated.Text
          style={[styles.feedbackText, { opacity: feedbackOpacity }]}
        >
          ¡Buen trabajo! 🎉
        </Animated.Text>

        {(() => {
          switch (studentContentPref) {
            case "VIDEO":
              return videoId ? (
                <View style={styles.containerVideo}>
                  <VideoPlayer videoId={videoId} />
                </View>
              ) : (
                <View style={styles.containerVideo}>
                  <Text style={styles.errorText}>
                    No se pudo cargar el vídeo. Verifica la URL.
                  </Text>
                </View>
              );

            case "AUDIO":
              return (
                <View style={styles.audioContainer}>
                  <TouchableOpacity onPress={playAudio} style={styles.button}>
                    <Image
                      source={require("../../../assets/boton_play.png")}
                      style={styles.image}
                    />
                    <Text>Reproducir audio</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={stopAudio} style={styles.button}>
                    <Image
                      source={require("../../../assets/boton_stop.png")}
                      style={styles.image}
                    />
                    <Text>Detener audio</Text>
                  </TouchableOpacity>
                </View>
              );

            case "PICTOGRAMAS":
              const pictogramSource = pictogramMap[currentStep.pictogram_url];

              return (
                <View style={styles.pictogramContainer}>
                  {pictogramSource ? (
                    <Image
                      source={pictogramSource}
                      style={styles.pictogramImage}
                    />
                  ) : (
                    <Text style={styles.errorText}>
                      Pictograma no encontrado
                    </Text>
                  )}
                </View>
              );

            default:
              return null;
          }
        })()}

        <View style={styles.buttonContainer}>
          <View style={styles.rowContainer}>
            {/* Botón Retroceder */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  setCurrentStep(taskSteps[currentIndex - 1]);
                } else {
                  alert("No se puede retroceder");
                }
              }}
            >
              <Image
                source={require("../../../assets/boton_anterior.png")}
                style={styles.actionButtonImage}
              />
              <Text style={styles.actionButtonText}>Anterior</Text>
            </TouchableOpacity>

            {/* Botón Siguiente */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                if (currentStep.status !== "completed") {
                  alert("Debes completar este paso primero.");
                  return;
                }

                if (currentIndex < taskSteps.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                  setCurrentStep(taskSteps[currentIndex + 1]);
                } else {
                  alert("Tarea completada");
                  navigation.goBack();
                }
              }}
            >
              <Image
                source={require("../../../assets/boton_siguiente.png")}
                style={styles.actionButtonImage}
              />
              <Text style={styles.actionButtonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>

          {/* Botón Marcar como Completado */}
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonMarkCompleted]}
            onPress={() => {
              if (!currentStep || !currentStep.id) {
                console.error(
                  "No se pudo encontrar el paso actual para marcar como completado."
                );
                return;
              }

              apiTasks
                .updateStepStatus(currentStep.id, "completed")
                .then(() => {
                  const updatedSteps = taskSteps.map((step, index) => {
                    if (index === currentIndex) {
                      return { ...step, status: "completed" };
                    }
                    return step;
                  });

                  setTaskSteps(updatedSteps);

                  if (currentIndex === taskSteps.length - 1) {
                    console.log(
                      "Marcando tarea como completada. ID de la tarea:",
                      taskId
                    );

                    apiTasks
                      .markTaskCompleted(taskId)
                      .then(() => {
                        //showFeedback("¡Tarea completada! 🎉");
                        setIsModalVisible(true);
                      })
                      .catch((error) => {
                        console.error(
                          "Error al marcar la tarea como completada:",
                          error.message
                        );
                      });
                  } else {
                    setCurrentIndex(currentIndex + 1);
                    setCurrentStep(updatedSteps[currentIndex + 1]);
                    showFeedback("¡Buen trabajo! 🎉");
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error al modificar el estado del paso de la tarea:",
                    error.message
                  );
                });
            }}
          >
            <Image
              source={require("../../../assets/ok.png")}
              style={styles.actionButtonImage}
            />
            <Text
              style={[
                styles.actionButtonText,
                styles.actionButtonTextMarkCompleted,
              ]}
            >
              Marcar como Completado
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true} // Fondo transparente
        animationType="slide" // Animación del modal
        onRequestClose={() => setIsModalVisible(false)} // Maneja cierre en Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              ¡Genial, has completado la tarea!
            </Text>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={handleCloseModal}
            >
              <Image
                source={require("../../../assets/ok.png")}
                style={styles.actionButtonImage}
              />
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Layaout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  stepText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginTop: 50,
    lineHeight: 36,
  },
  completedStepText: {
    color: "#28a745",
    textDecorationLine: "line-through",
  },
  noStepsText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    marginVertical: 16,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  containerVideo: {
    width: "50%",
    aspectRatio: 16 / 9,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#000",
    borderRadius: 16,
    marginVertical: 25,
  },
  pictogramContainer: {
    width: "50%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  audioContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginVertical: 25,
  },
  image: {
    width: 50,
    height: 50,
  },
  button: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  actionButtonMarkCompleted: {
    backgroundColor: "#28a745",
    marginVertical: 50,
  },
  actionButtonImage: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonModal: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  actionButtonTextMarkCompleted: {
    fontWeight: "900",
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semitransparente
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PantallaPasoTarea;

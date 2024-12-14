import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";

const HomeAlumno = ({ route }) => {
  const { alumno } = route.params;
  const navigation = useNavigation();
  const pictograma = {
    atras: "38249/38249_2500.png",
  };
  const [urlAtras, setUrlAtras] = useState(null);

  const fetchBackPictogram = async () => {
    const respuesta = await obtenerPictograma(pictograma.atras);
    if (respuesta) {
      setUrlAtras(respuesta);
    } else {
      Alert.alert("Error al obtener el pictograma.");
    }
  };

  useEffect(() => {
    fetchBackPictogram();
  }, []);

  useEffect(() => {
    const backAction = () => {
      // Redirige a la pantalla deseada
      navigation.navigate("Home");
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

  return (
    <SafeAreaView style={{ backgroundColor: alumno.color_tema, flex: 1 }}>
      <View style={styles.header}>
        {Platform.OS !== "android" && (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            {urlAtras && (
              <Image
                source={{ uri: urlAtras }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.titleHeader}>Página principal</Text>
      </View>

      <View style={styles.body}>
        <Text
          style={[{ fontSize: Number(alumno.tamaño_letra) }, styles.titleBody]}
        >
          Tipos de tareas
        </Text>

        {/* Cajas como botones */}
        <View style={styles.boxContainer}>
          {/* Caja 1 */}
          <TouchableOpacity
            style={styles.box}
            /* onPress={() => navigation.navigate("TareasPendientes", { alumno })} */
          >
            <Image
              source={require("../../../assets/tareas_comandas_comedor.png")} // Reemplaza con tu imagen
              style={styles.boxImage}
            />
            <Text
              style={[
                styles.boxText,
                { fontSize: Number(alumno.tamaño_letra) },
              ]}
            >
              Tareas de comandas de comedor
            </Text>
          </TouchableOpacity>

          {/* Caja 2 */}
          <TouchableOpacity
            style={styles.box}
            /* onPress={() => navigation.navigate("HistorialTareas", { alumno })} */
          >
            <Image
              source={require("../../../assets/tareas_inventario.png")}
              style={styles.boxImage}
            />
            <Text
              style={[
                styles.boxText,
                { fontSize: Number(alumno.tamaño_letra) },
              ]}
            >
              Tareas de inventario
            </Text>
          </TouchableOpacity>

          {/* Caja 3 */}
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Tasks", { student: alumno })}
          >
            <Image
              source={require("../../../assets/tareas_pasos.png")}
              style={styles.boxImage}
            />
            <Text
              style={[
                styles.boxText,
                { fontSize: Number(alumno.tamaño_letra) },
              ]}
            >
              Tareas por pasos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleHeader: {
    fontWeight: "bold",
    color: "black",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleBody: {
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  boxContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "40%",
    aspectRatio: 1, // Mantiene las cajas cuadradas
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  boxImage: {
    width: "70%",
    height: "50%",
    resizeMode: "contain",
    marginBottom: 10,
  },
  boxText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
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
});

export default HomeAlumno;

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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";

const HomeAlumno = ({ route }) => {
  const { alumno } = route.params;
  const navigation = useNavigation();
  const [urlAtras, setUrlAtras] = useState(null);


  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: alumno.color_tema }]}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Página principal</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.titleBody, { fontSize: Number(alumno.tamaño_letra) }]}>
          Tipos de tareas
        </Text>

        <View style={styles.boxContainer}>
          <TouchableOpacity 
            style={styles.box}
            onPress={()=> navigation.navigate("Comanda", {alumno: alumno})}
          >
            <Image
              source={require("../../../assets/tareas_comandas_comedor.png")}
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

          <TouchableOpacity 
            style={styles.box}
            onPress={()=> navigation.navigate("Inventario", {alumno: alumno})}
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

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Menu", {alumno: alumno})}
        >
          <Text style={styles.menuButtonText}>Menú</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backImage: {
    width: 50,
    height: 50,
  },
  titleHeader: {
    fontSize: 20,
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
    flexDirection: "column", // Disposición en columna
    alignItems: "center", // Centra las cajas horizontalmente
    width: "100%",
  },
  box: {
    width: "90%", // Ocupa el 90% del ancho
    aspectRatio: 3, // Relación de aspecto más horizontal
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10, // Espaciado vertical entre cajas
    elevation: 3,
  },
  boxImage: {
    width: "50%",
    height: "60%",
    resizeMode: "contain",
    marginBottom: 10,
  },
  boxText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    position: "relative",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    alignItems: "center",
  },
  menuButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeAlumno;

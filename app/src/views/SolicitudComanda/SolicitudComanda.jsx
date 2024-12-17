import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import { getEstudiantes } from "../../api/apiUsuario";
import { CheckBox } from "@rneui/base";
import {
  postTareaComanda,
  getTareaComanda,
  putTareaComanda,
  deleteTareaComanda,
} from "../../api/apiTarea";

const SolicitudComanda = () => {
  const pictograma = {
    atras: "38249/38249_2500.png",
    comanda: "4610/4610_2500.png",
  };
  const [urlAtras, setUrlsAtras] = useState(null);
  const [urlComanda, setUrlsComanda] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [filteredAlumnos, setFilteredAlumnos] = useState([]); // Alumnos filtrados
  const [searchQuery, setSearchQuery] = useState(""); // Término de búsqueda
  const [pictogramaCheck, setPictogramaCheck] = useState(null); // Estado para el checkbox
  const [existeComanda, setExisteComanda] = useState(false);
  const [alumnoReq, setAlumnoReq] = useState(null); // Estado para el alumno seleccionado
  const [id, setId] = useState(null);
  const fetchPictograma = async () => {
    const atras = await obtenerPictograma(pictograma.atras);
    if (atras) {
      setUrlsAtras(atras);
    } else {
      Alert.alert("Error", "No se pudo obtener el pictograma.");
    }
    const comanda = await obtenerPictograma(pictograma.comanda);
    if (comanda) {
      setUrlsComanda(comanda);
    } else {
      Alert.alert("Error", "No se pudo obtener el pictograma.");
    }
  };
  const compruebaComanda = async () => {
    const respuesta = await getTareaComanda();
    setId(respuesta.tareas[0].id);
    if (respuesta) {
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString().split("T")[0];
      if (respuesta.tareas[0].fecha_fin !== fechaFormateada) {
        setExisteComanda(true);
      } else {
        await deleteTareaComanda(id);
      }
    }
  };
  const loadStudents = async () => {
    const data = await getEstudiantes();
    if (data) {
      setAlumnos(data);
      setFilteredAlumnos(data); // Inicializa la lista filtrada
    } else {
      Alert.alert("Error", "No se pudieron obtener los alumnos.");
    }
  };

  const handleAñadirAlumnoPress = (alumno) => {
    setAlumnoReq(alumno); // Actualiza el alumno seleccionado
  };

  const handleCheckPress = (value) => {
    setPictogramaCheck(value); // Actualiza el estado del checkbox
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredAlumnos(alumnos); // Muestra todos los alumnos si no hay término de búsqueda
    } else {
      const filtered = alumnos.filter((alumno) =>
        `${alumno.nombre} ${alumno.apellido}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredAlumnos(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!alumnoReq) {
      Alert.alert("Error", "Por favor, selecciona un alumno.");
      return;
    }
    if (pictogramaCheck === null) {
      Alert.alert(
        "Error",
        "Por favor, selecciona una preferencia de pictograma."
      );
      return;
    }
    // Aquí podrías enviar la información a un servidor o manejarla localmente
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];
    const requestData = {
      fecha_entrega: fechaFormateada,
      alumno_id: alumnoReq.id,
      screen: "Comanda",
      url: urlComanda,
    };
    const resp = await postTareaComanda(requestData);
    if (resp) {
      Alert.alert(
        "Datos enviados",
        `Alumno: ${alumnoReq.nombre} ${alumnoReq.apellido}\nCon pictograma: ${
          pictogramaCheck ? "Sí" : "No"
        }`
      );
      navigation.goBack();
    } else {
      Alert.alert("Error", "No se pudo enviar los datos.");
    }
  };
  const handleModificar = async () => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];
    const requestData = {
      descripcion: pictogramaCheck
        ? "Comanda pictograma"
        : "Comanda sin pictograma",
      fecha_inicio: fechaFormateada,
      fecha_entrega: fechaFormateada,
    };
    const resp = await putTareaComanda(id, requestData);
    if (resp) {
      Alert.alert("Datos modificados", `Comanda modificada con éxito.`);
    } else {
      Alert.alert("Error", "No se pudieron modificar los datos.");
    }
  };
  const navigation = useNavigation();

  useEffect(() => {
    fetchPictograma();
    loadStudents();
    compruebaComanda(); // Comprueba si hay comanda activa para mostrar el checkbox de preferencia de pictograma
  }, []);

  return (
    <Layaout>
      <View style={styles.header}>
        {Platform.OS !== "android" && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{ uri: urlAtras }}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Tarea Comanda</Text>
      </View>
      <View style={styles.body}>
        {!existeComanda && (
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alumnos..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        )}
        {filteredAlumnos.length > 0 && !existeComanda && (
          <View>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Alumnos:</Text>
            <ScrollView>
              {filteredAlumnos.map((alumno, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.alumnoItem,
                    alumnoReq?.id === alumno.id && styles.selectedAlumnoItem,
                  ]}
                  onPress={() => handleAñadirAlumnoPress(alumno)}
                >
                  <Image
                    source={{ uri: alumno.foto_perfil }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 16 }}>
                    {alumno.nombre} {alumno.apellido}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {filteredAlumnos.length === 0 && (
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            No hay alumnos disponibles.
          </Text>
        )}
        <View style={styles.checkbox}>
          <CheckBox
            checked={pictogramaCheck === true}
            onPress={() => handleCheckPress(true)}
          />
          <Text style={styles.item}>Con pictogramas</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            checked={pictogramaCheck === false}
            onPress={() => handleCheckPress(false)}
          />
          <Text style={styles.item}>Sin pictogramas</Text>
        </View>
        {!existeComanda ? (
          <Button title="Enviar" onPress={handleSubmit} />
        ) : (
          <Button title="Modificar" onPress={handleModificar} />
        )}
      </View>
    </Layaout>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  body: {
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  alumnoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  selectedAlumnoItem: {
    backgroundColor: "#f0f8ff",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SolicitudComanda;

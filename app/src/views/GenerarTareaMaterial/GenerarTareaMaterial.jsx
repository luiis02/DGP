import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getEstudiantes } from "../../api/apiUsuario";
import { useNavigation } from "@react-navigation/native";
import { postSolicitud } from "../../api/apiInventario";

const GenerarTareaMaterial = ({ route }) => {
    const [solicitud, setSolicitud] = useState({});
    const [alumno, setAlumno] = useState(null);
    const [urlAtras, setUrlAtras] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const navigation = useNavigation();
    const pictogramas = {
        atras: "38249/38249_2500.png",
    };

    const fetchPictogramas = async () => {
        const respuesta = await obtenerPictograma(pictogramas.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        }
    };

    const fetchEstudiantes = async () => { 
        const respuesta = await getEstudiantes();
        if (respuesta) {
            setEstudiantes(respuesta);
        }
    };

    useEffect(() => {
        fetchPictogramas();
        fetchEstudiantes();
    }, []);

    useEffect(() => {
        if (route.params?.solicitud) {
            setSolicitud(route.params.solicitud);
        }
    }, [route.params]);

    const handleSumbitPress = async (alumno) => {
        if (alumno) {
            const datosSolicitud = {
                estudianteId: alumno.id,
                aula: solicitud.aula,
                materiales: solicitud.materiales
            }
            const data = await postSolicitud(datosSolicitud)
            if (data) {
                Alert.alert("Tarea enviada correctamente.");
                navigation.goBack();
            } else {
                Alert.alert("Error al enviar la tarea.");
            }
        }else{
            Alert.alert("Debe seleccionar un alumno.");
        }
    };

    const estudiantesFiltrados = estudiantes.filter(estudiante => 
        estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Layaout>
            <View style={styles.header}>
                {urlAtras && 
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={{ uri: urlAtras }} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                }
                <Text style={styles.titleHeader}>Generar Tarea de Material</Text>
            </View>
            
            {/* Buscador de alumnos */}
            <TextInput
                style={styles.buscador}
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <Text style={styles.label}>Estudiantes:</Text>
            <ScrollView style={styles.alumnos}>
                {estudiantesFiltrados.map((estudiante) => (
                    <TouchableOpacity key={estudiante.id} onPress={() => setAlumno(estudiante)}>
                        <View style={styles.estudianteItem}>
                            <Image style={styles.imagenAlumo} source={{ uri: estudiante.foto_perfil }} />
                            <Text style={styles.estudiante}>{estudiante.nombre} {estudiante.apellido}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Mostrar detalles de la solicitud */}
            {solicitud && (
                <ScrollView style={styles.solicitudDetails}>
                    <Text style={styles.solicitudTitle}>Detalles de la Solicitud</Text>
                    <Text style={styles.solicitudText}>Profesor: {solicitud.profesor}</Text>
                    <Text style={styles.solicitudText}>Aula: {solicitud.aula}</Text>
                    <Text style={styles.solicitudText}>Fecha: {solicitud.fechaSolicitud}</Text>
                    <Text style={styles.solicitudText}>Materiales:</Text>
                    {solicitud.materiales?.map((material, index) => (
                        <Text key={index} style={styles.solicitudText}>- {material.nombre} (Cantidad: {material.cantidad})</Text>
                    ))}
                </ScrollView>
            )}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.botonFooter} onPress={() => handleSumbitPress(alumno)}>
                    <Text style={styles.botonText}>Generar Tarea</Text>
                </TouchableOpacity>
            </View>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buscador: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    alumnos: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    estudianteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    imagenAlumo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
    },
    estudiante: {
        fontSize: 16,
    },
    solicitudDetails: {
        paddingHorizontal: 20,
        marginBottom: 80,
    },
    solicitudTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    solicitudText: {
        fontSize: 16,
        marginBottom: 5,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F5F5F5',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    botonFooter: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    botonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default GenerarTareaMaterial;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Icon, Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getTareasAlumno } from "../../api/apiTarea";



const HistorialTareas = ({route}) => { 
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    };
    const navigation = useNavigation();
    const {alumno} = route.params || {};
    const [urlAtras, setUrlAtras] = useState(null);
    const [historialTareasRealizadas, setHistorialTareasRealizadas] = useState([]);

    // Utilidad para dar formato a las fechas:
    const formatearFecha = (cadenaFecha) => {
        const date = new Date(cadenaFecha); // Convertir la cadena en objeto Date
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'short' }).format(date);
    };
    
    // Consultas a la BD:
    const fetch = async () => {

        // Obtener el pictograma del icono de retroceso de página:
        const respuesta = await obtenerPictograma(pictogramas.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }

        // Obtener las tareas del alumno recibido:
        const tareas = await getTareasAlumno(alumno.id);
        console.log("Datos devueltos por 'getTareasAlumno':", tareas);
        console.log("Tipo de dato:", typeof tareas);
        if (tareas) {
            Alert.alert("Se han obtenido las tareas del alumno correctamente.");
            setHistorialTareasRealizadas(tareas);
        } else {
            Alert.alert("Error al obtener las tareas del alumno.");
            setHistorialTareasRealizadas([]);
        }
        
    }
    
    useEffect(() => {
        fetch();
    }, []);



    return (
        <Layaout>
            {/* Título de la pantalla */}
            <View style={styles.header}>
                {Platform.OS !== 'android' &&
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {urlAtras && <Image source={{ uri: urlAtras }} style={styles.iconBack} />}
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.body}>
                {/* Datos del alumno */}
                <View style={styles.header}>
                    <Image source={{uri: alumno.foto_perfil}} style={{width: 80, height: 80, borderRadius: 40}} />
                    <Text style={styles.cabecera}>{alumno.nombre} {alumno.apellido}</Text>
                </View>

                {/* Historial con todas las tareas (activas y terminadas): */}
                <View style={styles.contenedorCabecera}>
                    <Text style={styles.cabecera}>Historial de tareas</Text>
                </View>
                
                {/* Cabeceras de la tabla donde se muestran los datos del historial */}
                <View style={styles.header}>
                    <Text style={styles.headerCell}>ID tarea</Text>
                    <Text style={styles.headerCell}>Fecha inicio</Text>
                    <Text style={styles.headerCell}>Fecha fin</Text>
                    <Text style={styles.headerCell}>Estado</Text>
                    <Text style={styles.headerCell}>Prioridad</Text>
                </View>

                {/* Historial de las tareas realizadas por el alumno pasado */}
                <ScrollView style={styles.scrollView}>
                    {Array.isArray(historialTareasRealizadas) && 
                     historialTareasRealizadas.length > 0 ? (
                        historialTareasRealizadas.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={styles.item}
                            >
                                <Text style={styles.itemText}>{item.id}</Text>
                                <Text style={styles.itemText}>{formatearFecha(item.fecha_inicio)}</Text>
                                <Text style={styles.itemText}>{formatearFecha(item.fecha_fin)}</Text>
                                <Text style={styles.itemText}>{item.estado}</Text>
                                <Text style={styles.itemText}>{item.prioridad}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.itemText}>No hay tareas disponibles</Text>
                    )}
                </ScrollView>
            </View>
        </Layaout>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBack: {
        width: 50,
        height: 50,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    body: {
        flex: 1,
        justifyContent: 'space-between',
    },
    filtrar: {
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },    
    item: {
        flexDirection: 'row',
        paddingLeft: 3,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
    },
    itemText: {
        flex: 1,
        fontSize: 13,
        textAlign: 'center',
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cabecera: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contenedorCabecera: {
        marginBottom: 50,
    }
});

export default HistorialTareas;
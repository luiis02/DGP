import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getTareasAlumno } from "../../api/apiTarea";



const HistorialTareas = ({route}) => { 
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    };
    const navigation = useNavigation();
    const {alumno, admin} = route.params || {};
    const [urlAtras, setUrlAtras] = useState(null);
    const [historialTareas, setHistorialTareas] = useState([]);

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
        if (tareas) {
            setHistorialTareas(tareas);
        } else {
            Alert.alert("Error al obtener las tareas del alumno.");
            setHistorialTareas([]);
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
                <View>
                    <Text style={styles.titleHeader}>Informe</Text>
                    <Text style={styles.subTitleHeader}>Alumna: {alumno.nombre} {alumno.apellido}</Text>
                </View>
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
                <View style={styles.scrollView}>
                    {/* Historial de las tareas realizadas por el alumno pasado */}
                    <ScrollView>
                        {Array.isArray(historialTareas) && 
                        historialTareas.length > 0 ? (
                            historialTareas.map((item) => (
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
                

                {/* El botón para generar el informe del alumno solo aparecerá en caso de que el 
                profesor que está en la pantalla es un usuario administrador */}
                {admin && Platform.OS === "web" && (
                    <View style={styles.contenedorBoton}>
                        <TouchableOpacity 
                        style={styles.botonGenerarInforme} 
                        onPress={() => {
                            navigation.navigate(
                                'InformeAlumno', 
                                {alumno: alumno, historialTareas: historialTareas})
                        }
                        }>
                            <Text style={styles.botonTexto}>Generar informe</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    subTitleHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
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
    },
    contenedorBoton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonGenerarInforme: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    botonTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold', 
    }
});

export default HistorialTareas;
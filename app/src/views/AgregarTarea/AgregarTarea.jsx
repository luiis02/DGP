
import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { postTarea } from "../../api/apiTarea";
import { ScreenHeight } from "@rneui/base";

const AgregarTarea = () => {

    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [urlAtras, setUrlAtras] = useState(null);
    const [fechaFin, setFechaFin] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [idEstudiante, setIdEstudiante] = useState('');
    
    
    const fechaInicio = new Date().toISOString().split('T')[0];
    
    const fetch = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
    }

    

    useEffect(() => {
        fetch();
    }, []);
    
    const asignarTareaEstudiante = async (datos) => {
        if (!datos.id_estudiante || !datos.fecha_inicio || !datos.fecha_fin || !datos.prioridad) {
            alert("Por favor, complete todos los campos.");
            return;
        }
    
        try {
            const response = await postTarea(datos);
    
            if (response) {
                setMessage(response.message || "Tarea creada exitosamente.");
            } else {
                setMessage("Error desconocido al asignar tarea.");
            }
        } catch (error) {
            console.error("Error al asignar tarea:", error);
            setMessage("Hubo un error al conectar con el servidor.");
        }
    };
    

    return (
        <Layaout>
           <View style={styles.header}>
            {Platform.OS !== 'android' &&
            <TouchableOpacity onPress={() => navigation.goBack()}>
            {urlAtras &&
                <Image source={{uri: urlAtras}} style={{width:50, height: 50}}/>
            }
            </TouchableOpacity>
            }
            <Text style={styles.titleHeader}>Añadir Tarea</Text>
           </View>
            <View style={styles.formContainer}>
                
                <Text >Fecha Fin:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={fechaFin}
                    onChangeText={setFechaFin}
                />
                
                <Text >Prioridad:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Prioridad"
                    value={prioridad}
                    onChangeText={setPrioridad}
                />
               
                <Text>ID Estudiante:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID Estudiante"
                    value={idEstudiante}
                    onChangeText={setIdEstudiante}
                />


            </View>

            {/* Botón en la parte inferior */}
            {/* se añade una nueva tarea con los datos */}

            <View style={styles.botonAñadirTarea}>
            <Button 
                    title="Añadir Tarea" 
                    buttonStyle={styles.button} 
                    onPress={() => {
                        const datos = {
                        fecha_inicio: fechaInicio,
                        fecha_fin: fechaFin,
                        prioridad,
                        id_estudiante: idEstudiante,
                        };
                        asignarTareaEstudiante(datos);
                    }} 
                    />

            </View>
            
        </Layaout>
    )
}
const styles = StyleSheet.create({
    header: { 
        backgroundColor: '#F8F8F8',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body:{},
    input: {
        backgroundColor: '#F8F8F8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#B4D2E7',},
    info: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        margin: 10,
    },
    button: {
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        margin: 10,
    },
    inputContraseña: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        backgroundColor: '#F8F8F8',
        width: 50,
        height: 50,
        marginHorizontal: 5,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    showFigure: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 10, 
    },
    sliderContainer: {
        marginBottom: 20,
        flexDirection: 'row',
    },
    
    botonAñadirTarea:{
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        paddingVertical: 1,
        borderRadius: 5,
        margin: 10,
    },

    formContainer: {
        flex: 1,
        margin: 10,
    },
})
export default AgregarTarea;
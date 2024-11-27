/*import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Layaout} from "../../components/Layaout/Layaout";
import { obtenerPictograma } from "../../api/apiArasaac";

const AgregarTarea = () => {
    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation();
    
    const [tareaId, setTareaId] = useState('');
    const [estudianteId, setEstudianteId] = useState('');
    const [message, setMessage] = useState('');
    const [urlAtras, setUrlAtras] = useState(null);


    const fetch = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
    }

    const asignarEstudiante = async (tareaId, estudianteId) => {
        if (!tareaId || !estudianteId) {
            alert("Por favor, complete ambos campos.");
            return;
        }

        try {
            const response = await fetch(`/asignar_estudiante/${tareaId}/${estudianteId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Error desconocido al asignar estudiante.");
            }
        } catch (error) {
            console.error("Error al asignar estudiante:", error);
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
       
        </Layaout>
    );
};
export default AgregarTarea;

*/

import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { Alert } from "react-native";

const AgregarTarea = () => {

    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    
    const navigation = useNavigation();
    const [tareaId, setTareaId] = useState('');
    const [estudianteId, setEstudianteId] = useState('');
    const [message, setMessage] = useState('');
    const [urlAtras, setUrlAtras] = useState(null);
    const [nombreUsuario, setNombreUsuario] = useState('');
    
    
    
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
            <Text style={styles.titleHeader}>Añadir Alumno</Text>
           </View>
            
            <Button title="Añadir Tarea" buttonStyle={styles.button} />
            
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
    input: {},
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
        inputContraseña: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
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
})
export default AgregarTarea;
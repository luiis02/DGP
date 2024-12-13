import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getProfesores } from "../../api/apiUsuario";

const GestionProfesores = () => {
    const pictogramas = {
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation(); 
    const [urlAtras, setUrlAtras] = useState(null); 
    const [profesores, setProfesores] = useState([]);
    const fetchPictograma = async () => {
        // Implementación para obtener el pictograma
        const respuesta = await obtenerPictograma(pictogramas.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    }
    const fetchProfesores = async () => { 
        // Implementación para obtener los profesores
        const respuesta = await getProfesores(); 
        if (respuesta) {
            setProfesores(respuesta);
        } else {
            Alert.alert('Error', 'No se pudieron obtener los profesores.');
        }
    }
    useFocusEffect(
        useCallback(()=>{
        fetchProfesores(); 
        fetchPictograma();
    },[])
    )
    useEffect(()=>{
        console.log(profesores)
    },[profesores]);
    return(
        <Layaout>
            <View style={styles.header}>  
                {Platform.OS !== "android" &&
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Image 
                        source={{uri: urlAtras}}
                        style = {styles.iconButton}
                    />
                    <Text style={styles.textHeader}>Atras</Text>
                </TouchableOpacity>
                }
                <Text style={styles.textHeader}>Gestión de Profesores</Text>
            </View>
            <View style={styles.body}>
                {profesores.map((profesor, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={()=> navigation.navigate('DetallesProfesor', {profesor})}>
                        <Text style={styles.textButton}>{profesor.nombre} {profesor.apellido}</Text>
                    </TouchableOpacity>
                ))} 
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('AgregarProfesor')}>
                    <Text style={styles.textButton}>Agregar Profesor</Text>
                </TouchableOpacity>
            </View>
        </Layaout>
    ); 
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    iconButton: { 
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    textHeader: {
        fontSize: 20,
    },
    container: {
        backgroundColor: '#F8F8F8',
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        marginBottom: 10,
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        paddingHorizontal: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F8F8F8',
    },
}); 

export default GestionProfesores;

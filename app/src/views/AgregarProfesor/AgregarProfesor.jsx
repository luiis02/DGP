import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View,Image, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { Button } from "@rneui/base";
import { getProfesor, postProfesor } from "../../api/apiUsuario";

const AgregarProfesor = () => { 
    const [username, setUserName] = useState(null); 
    const [nombre, setNombre] = useState(null); 
    const [apellido, setApellido] = useState(null); 
    const [urlAtras, setUrlAtras] = useState(null);
    const [profesores, setProfesores] = useState([]);
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation();
    const fetchPictograma = async () => { 
        // Implementación para obtener el pictograma
        const url = await obtenerPictograma(pictogramas.atras);
        if (url) {
            setUrlAtras(url);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    }
    const fetchProfesores = async () => {
        // Implementación para obtener los profesores
        const respuesta = await getProfesor(); 
        if (respuesta) {
            setProfesores(respuesta);
        } else {
            Alert.alert('Error', 'No se pudieron obtener los profesores.');
        }
    }
    const handleAñadirPress = async () => { 
        const profesor = profesores.find(prof => prof.nombre_usuario === username);
        if (profesor) {
            Alert.alert('Error', 'El nombre de usuario ya existe.');
        } else {
            const datosProfesor = {
                "nombre_usuario": username,
                "nombre": nombre,
                "apellido": apellido,
                "tipo_usuario": "PROFESOR",
                "contraseña": 1, 
            };
            const respuesta = await postProfesor(datosProfesor);
            if(respuesta){
                Alert.alert("Profesor agregado exitosamente.");
                navigation.goBack();
            } else {
                Alert.alert("Error", "No se pudo agregar el profesor.");
            }
    
        }
    }
    useEffect(()=>{
        fetchProfesores();  // Obtiene los profesores al cargar la pantalla
        fetchPictograma();
    },[]);
    return (
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== "android" && 
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image 
                        source={{uri: urlAtras}}
                        style = {styles.iconButton}
                    />
                    <Text style={styles.textHeader}>Atras</Text>
                </TouchableOpacity>}
                <Text style={styles.titleHeader}>Agregar Profesor</Text>
            </View>
            <Input
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUserName}
            />
            <Input
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <Input
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
            />
            <Button
                title="Agregar Profesor"
                buttonStyle={styles.button}
                onPress={()=> handleAñadirPress()}
            />
        </Layaout>
        
    )
}
const styles = StyleSheet.create({
    header: {
        ppaddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    input: {
        marginBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    iconButton: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    textHeader: {
        fontSize: 20,
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
    },
});
export default AgregarProfesor
import React, { useEffect, useState } from "react";
import { Text, Alert, View, Platform, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from '@rneui/base';
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getMateriales } from "../../api/apiTarea";
const Inventario = ({route}) =>{
    const [urlAtras, setUrlAtras] = useState(null);
    const [aula, setAula] = useState("");
    const [profesor, setProfesor] = useState("");
    const [materiales, setMateriales] = useState([]);
    const { tarea, alumno } = route.params;
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    }
    const fetchPictograma = async () => { 
        // Obtener el pictograma del alumno
        const url = await obtenerPictograma(pictogramas.atras);
        if (url) {
            setUrlAtras(url);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    }
    const obtenerMateriales = async () => { 
        const response = await getMateriales(alumno.id); 
        if(response){
            setAula(response.materiales[0].aula)
            setProfesor(response.materiales[0].profesor)
            setMateriales(response.materiales[0].material)
        }

    } 
    const navigation = useNavigation();
    useEffect(()=>{
        obtenerMateriales();
        fetchPictograma();
    },[])
    return (
        <SafeAreaView style={[{backgrounColor: alumno.color_tema}, styles.container]}>
            <View style={styles.header}>
                {Platform.OS !== "android" && 
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Image source={{uri: urlAtras}} style={styles.imagen}/>
                    <Text style={[styles.titleHeader, {fontSize: alumno.tamaño_letra}]}>Atras</Text>
                </TouchableOpacity>
                }
                <Text style={[styles.titleHeader, {fontSize: alumno.tamaño_letra}]}>Inventario</Text>
            </View>
            <View style={styles.body}>
                <Text style={[styles.infoHeader, {fontSize: alumno.tamaño_letra}]}>Aula: {aula}</Text>
                <Text style={[styles.infoHeader, {fontSize: alumno.tamaño_letra}]}>Profesor: {profesor}</Text>
                <View style={styles.materiales}>
                    {materiales.map((material, index)=>(
                        <View key={index} style={styles.material}>
                            <Text style={[styles.infoHeader, {fontSize: alumno.tamaño_letra}]}>Material: {material.nombre} Cantidad: {material.cantidad}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    imagen: {
        width: 50,
        height: 50,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body:{
        padding: 20,
    },
    infoHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    materiales: {
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    material: {
        marginBottom: 10,
    }
    
});
export default Inventario;
import React, { useEffect, useState } from "react";
import { Text, Alert, View, Platform, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from '@rneui/base';
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
const Inventario = ({route}) =>{
    const [urlAtras, setUrlAtras] = useState(null);
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
    const navigation = useNavigation();
    useEffect(()=>{
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
});
export default Inventario;
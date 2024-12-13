import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";

const DetallesProfesor = ({route}) => { 
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    }
    const [urlAtras, setUrlAtras] = useState(null);
    const navigation = useNavigation();  // Obtener la navegación
    const fetchPictograma = async () => {
        // Implementación para obtener el pictograma
        const respuesta = await obtenerPictograma(pictogramas.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    }
    useEffect(() => {
        fetchPictograma();
    }, []);
    const profesor = route.params.profesor;  // Obtener el profesor desde la navigation.navigate
    return (
        <Layaout>
             <View style={styles.header}>
                {Platform.OS !== "android" &&
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Image 
                            source={{uri: urlAtras}}
                            style={styles.iconButton}
                        />
                        <Text style={styles.text}>Atras</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.textHeader}>Detalles del Profesor</Text>
             </View>
             <View style={styles.body}>
                <Text style={styles.text}>Nombre: {profesor.nombre}</Text>
                <Text style={styles.text}>Apellido: {profesor.apellido}</Text>
             </View>
             <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.goBack()}>
                    <Text style={styles.textButton}>Solicitud de cambio de contraseña</Text>
                </TouchableOpacity>
             </View>
        </Layaout>
       
    )
}
const styles = StyleSheet.create({ 
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    iconButton: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    textHeader: {
        fontSize: 20,
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetallesProfesor;
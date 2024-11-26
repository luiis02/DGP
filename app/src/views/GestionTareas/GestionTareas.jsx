import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getEstudiantes } from "../../api/apiUsuario";
import { Icon, Button } from "@rneui/themed";
import { Input } from "@rneui/base";

const GestionTareas = () => {
    const pictograma = { 
        atras: "38249/38249_2500.png", 
    }
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);
    
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
                            <Image source={{uri: urlAtras}} style={{width: 50, height: 50}} />
                        }
                    </TouchableOpacity>
                }
                <Text style={styles.titleHeader}> Gestión de Tareas</Text>
            </View>

           
            
        </Layaout>     
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        flex: 1,
        justifyContent: 'space-between', // Asegura que el contenido se distribuya de manera uniforme
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
        fontSize: 13,
        marginLeft: 10,
    },
    footer: {
        padding: 20,
        justifyContent: 'flex-end',  // Asegura que el botón esté alineado en la parte inferior
        alignItems: 'center',
    },
});

export default GestionTareas;

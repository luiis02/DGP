import React, { useState, useEffect } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { Button, Text, Icon, Image } from "@rneui/base";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";

const HomeProfesor = () => { 
    const [urlAlumnos, setUrlAlumnos] = useState(null); 
    const [urlSolicitud, setSolicitud] = useState(null);
    const pictogramas = {
        alumnos: "7062/7062_2500.png",  // Pictograma para gestionar alumnos
        solicitud: "34153/34153_2500.png",  // Pictograma para gestionar solicitudes
    }
    const buttons = [
        {title: "Solicitud material", icon: urlSolicitud, screen: "SolicitudMaterial"}, 
        {title: "Alumnos", icon: urlAlumnos, screen: "Alumnos"},
    ]
    const fetchPictograma = async () => {
        const alumnos = await obtenerPictograma(pictogramas.alumnos);
        if (alumnos) {
            setUrlAlumnos(alumnos);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
        const solicitud = await obtenerPictograma(pictogramas.solicitud);
        if (solicitud) {
            setSolicitud(solicitud);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    }
    const navigation = useNavigation();
    useEffect(() => {
        fetchPictograma();
    }, [])
    return (
        <Layaout>
            <View style={styles.header}>
                <Text style={styles.headerText}>Página principal</Text>
                <View style={styles.button}>
                    <Button
                            icon = {<Icon 
                                        name="log-out-outline"
                                        type="ionicon"
                                        color="black"
                                        />
                                    }
                            color='#F8F8F8'
                            onPress={() => {
                                navigation.navigate('Home');
                            }}
                        />
                </View>
            </View>
            <View style={styles.body}>
                {buttons.map((button, index) => (
                    <TouchableOpacity key={index} style={styles.elements} onPress={() => navigation.navigate(button.screen)}>
                        <Image source={{uri: button.icon}} style={{width: 90, height: 90}} />
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginVertical: 10}}>{button.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Layaout>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    button: { 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'flex-end',
    },
    body: {
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    elements: {
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 50,
    }, 
});
export default HomeProfesor;
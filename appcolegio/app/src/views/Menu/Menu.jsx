import { Image } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";

const Menu = ({ route }) => {
    const { alumno } = route.params;
    const [urlInicio, setUrlInicio] = useState(null);
    const [urlCerrarSesion, setUrlCerrarSesion] = useState(null);
    const [urlJuego, setUrlJuego] = useState(null);
    const [urlChat, setUrlChat] = useState(null);
    const pictogramas = {
        inicio: "9861/9861_2500.png",
        cerrarSesion: "2806/2806_2500.png",
        juego: "37464/37464_2500.png",
        chat: "36398/36398_2500.png",
    };

    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma(pictogramas.inicio);
        if (respuesta) {
            setUrlInicio(respuesta);
        } else {
            Alert.alert("Error", "No se pudo obtener el pictograma.");
        }

        const respuesta2 = await obtenerPictograma(pictogramas.cerrarSesion);
        if (respuesta2) {
            setUrlCerrarSesion(respuesta2);
        } else {
            Alert.alert("Error", "No se pudo obtener el pictograma.");
        }
        const respuesta3 = await obtenerPictograma(pictogramas.juego);
        if (respuesta3) {
            setUrlJuego(respuesta3);
        } else {
            Alert.alert("Error", "No se pudo obtener el pictograma.");
        }
        const respuesta4 = await obtenerPictograma(pictogramas.chat);
        if (respuesta4) {
            setUrlChat(respuesta4);
        } else {
            Alert.alert("Error", "No se pudo obtener el pictograma.");
        }
    };
    const buttons = [
        {title: "Juego", icon: urlJuego, screen: "Juego"}, 
        {title: "Chat", icon: urlChat, screen: "Chat"},
        {title: "Cerrar Sesión", icon: urlCerrarSesion, screen: "Home"},
    ]
    const navigation = useNavigation();

    useEffect(() => {
        fetchPictograma();
    }, []);

    return (
        <SafeAreaView style={[{ backgroundColor: alumno.color_tema }, styles.container]}>
            <View style={styles.header}>
                {urlInicio && (
                    <TouchableOpacity style={styles.centeredTouchable} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: urlInicio }} style={styles.icon} />
                        <Text style={[{ fontSize: alumno.tamaño_letra }, styles.titleHeader]}>Inicio</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.body}>
                {buttons.map((button, index) =>(
                    <TouchableOpacity key={index} style={styles.centeredTouchable} onPress={() => navigation.navigate(button.screen, {alumno: alumno})}>
                        <Image source={{ uri: button.icon }} style={styles.icon} />
                        <Text style={[{ fontSize: alumno.tamaño_letra }, styles.titleHeader]}>{button.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: 'flex-start',
    },
    titleHeader: {
        fontWeight: "bold",
        color: "black",
        marginTop: 5,
    },
    body: {
        padding: 20,
        alignItems: "center",
    },
    centeredTouchable: {
        alignItems: "center",
        marginBottom: 10,
    },
    icon: {
        width: 80,
        height: 80,
    },
});

export default Menu;

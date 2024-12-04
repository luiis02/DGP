import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { Platform, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";

const GestionComedor = () => {
    const pictograma = {
        atras: "38249/38249_2500.png",
        comanda: "37340/37340_2500.png",
        solicitudComanda: "2681/2681_2500.png",
    };
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);
    const [urlComanda, setUrlComanda] = useState(null);
    const [urlSolicitudComanda, setUrlSolicitudComanda] = useState(null);

    const buttons = [
        { title: "Informe de Comanda", icon: urlComanda, screen: "ComandaPdf" },
        { title: "Tarea comanda", icon: urlSolicitudComanda, screen: "SolicitudComanda" },
    ];

    const fetchPictograma = async () => {
        try {
            const atras = await obtenerPictograma(pictograma.atras);
            setUrlAtras(atras || null);

            const comanda = await obtenerPictograma(pictograma.comanda);
            setUrlComanda(comanda || null);

            const solicitudComanda = await obtenerPictograma(pictograma.solicitudComanda);
            setUrlSolicitudComanda(solicitudComanda || null);
        } catch (error) {
            Alert.alert('Error', 'No se pudieron obtener los pictogramas.');
        }
    };

    useEffect(() => {
        fetchPictograma();
    }, []);

    return (
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== 'android' && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={{ uri: urlAtras }} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>Gestión de Comedor</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.elements}>
                    {buttons.map((button, index) => (
                        <TouchableOpacity
                            style={styles.touchableButton}
                            key={index}
                            onPress={() => navigation.navigate(button.screen)}
                        >
                            <View style={styles.button}>
                                <Image source={{ uri: button.icon }} style={{ width: 50, height: 50 }} />
                                <Text style={styles.buttonText}>{button.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
    },
    elements: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // Permite que los botones ocupen varias filas si es necesario
        flex: 1,
    },
    touchableButton: {
        height: 150,
        width: 150, // Tamaño flexible para dos botones por fila
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10, // Espaciado entre botones
        borderRadius: 10, // Bordes redondeados opcionales
    },
    button: {
        alignItems: 'center', // Centra los elementos dentro del botón
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        marginTop: 10, // Espaciado entre el icono y el texto
        textAlign: 'center', // Alineación central del texto
        color: '#333', // Color del texto
    },
});

export default GestionComedor;

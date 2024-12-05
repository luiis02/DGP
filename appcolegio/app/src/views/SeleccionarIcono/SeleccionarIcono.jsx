import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import WebView from "react-native-webview";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const SeleccionarIcono = () => { 
    const [urlAtras, setUrlAtras] = useState(null); 
    const [downloadedImage, setDownloadedImage] = useState(null);
    const navigation = useNavigation(); 

    useEffect(() => {
        const fetchPictogramas = async () => {
            const respuesta = await obtenerPictograma("38249/38249_2500.png");
            if (respuesta) setUrlAtras(respuesta);
        };
        fetchPictogramas();
    }, []);

    const handleDownload = async (url) => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permiso denegado", "Necesitas otorgar permisos para acceder al almacenamiento.");
                return;
            }

            const fileUri = `${FileSystem.documentDirectory}downloaded_image.png`;
            await FileSystem.downloadAsync(url, fileUri);
            await MediaLibrary.saveToLibraryAsync(fileUri);
            setDownloadedImage(fileUri);
            Alert.alert("Descarga completa", "La imagen ha sido guardada en tu galería.");
            navigation.goBack();
        } catch (error) {
            console.error("Error al descargar la imagen:", error);
        }
    };

    return (
        <Layaout>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconoButton} onPress={() => navigation.goBack()}>
                    {urlAtras && <Image source={{ uri: urlAtras }} style={styles.iconoAtras} />}
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Seleccionar icono</Text>
            </View>
            <View style={styles.bodyContainer}>
                <WebView 
                    source={{ uri: 'https://arasaac.org/pictograms/search' }} 
                    style={styles.webview} 
                    onShouldStartLoadWithRequest={(event) => {
                        if (event.url.endsWith('.png') || event.url.endsWith('.jpg')) {
                            handleDownload(event.url);
                            return false; // Cancela la carga en el WebView
                        }
                        return true;
                    }}
                />
                {downloadedImage && (
                    <Image source={{ uri: downloadedImage }} style={styles.downloadedImage} />
                )}
            </View>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    iconoButton: {
        width: 50,
        height: 50,
    },
    iconoAtras: {
        width: 50,
        height: 50,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    bodyContainer: {
        flex: 1,
        justifyContent:'space-between',
    },
    webview: {
        flex: 1,
    },
    downloadedImage: {
        width: '100%',
        height: 300,
        marginTop: 10,
    }
});

export default SeleccionarIcono;

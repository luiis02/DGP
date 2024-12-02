import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import { getTareasJuego } from "../../api/apiTarea";

const Juego = ({route}) => {
    const { alumno } = route.params;  // Obtiene el alumno desde la ruta
    const [urlAtras, setUrlAtras] = useState(null);
    const [urlJuego, setUrlJuego] = useState(null);
    const pictogramas = {
        atras: "38249/38249_2500.png",  // Pictograma para volver atrás
    }
    const fetchPictograma = async () => {
        // Obtiene el pictograma del alumno
        const url = await obtenerPictograma(pictogramas.atras);
        setUrlAtras(url);
    }
    const fetchJuego = async () => {
        const url = await getTareasJuego();
        setUrlJuego(url);
    }
    const navigation = useNavigation();
    useEffect(()=>{
        fetchJuego();
        fetchPictograma();
    },[])
    return(
        <SafeAreaView style={[{backgroundColor: alumno.color_fondo}, styles.container]}>
            { urlJuego ? (
            <>
                {urlAtras &&
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Image source={{uri: urlAtras}} style={{width: 50, height: 50}} />
                    </TouchableOpacity>  
                    <Text style={[{fontSize: alumno.tamaño_letra}, styles.title]}>Juego</Text> 
                </View> 
                }
            <View style={styles.body}>
               <WebView
                source={{uri: "https://www.google.com/?client=safari"}}
               />
            </View>
            </>):(
                <View style={styles.none}>
                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>Juego</Text>
                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>Logopedia</Text>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Image source={{uri: urlAtras}} style={{width: 150, height:150}}/>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>    
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        paddingHorizontal: 20,
        flex: 1,
    },
    none: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Juego;
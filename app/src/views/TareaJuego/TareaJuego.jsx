import React, { useCallback, useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { Input } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { deleteTareaJuego, getTareasJuego, postTareaJuego } from "../../api/apiTarea";

const TareaJuego = () => {
    const [urlAtras, setUrlAtras] = useState(null); 
    const [urlJuego, setUrlJuego] = useState(null); 
    const [urlIntroducida, setUrlIntroducida] = useState(null);
    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation();
    const fetchPictogramas = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        }else{
            Alert.alert("Error al obtener el pictograma.");
        }
    };
    const fetchExiteJuego = async () => { 
        const respuesta = await getTareasJuego(); 
        if (respuesta) {
            setUrlJuego(respuesta);
        }
    }
    const handleEliminarJuegoPress = async () => {
        const respuesta = await deleteTareaJuego(urlJuego[0].id);
        if(respuesta){
            Alert.alert("Tarea eliminada correctamente.");
            navigation.goBack();
        }else{
            Alert.alert("Error al eliminar la tarea.");
        }
    }
    function esURL(cadena) {
        const patronURL = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-.~:?#[\]@!$&'()*+,;=]*)*\/?$/;
        return patronURL.test(cadena);
      }
    const handleAceptarPress = async () => {
        if(!urlIntroducida){
            Alert.alert("Error", "Debe introducir un URL válido.");
        }else {
            if(esURL(urlIntroducida)){ 
                console.log(urlIntroducida);
                const respuesta = await postTareaJuego(urlIntroducida); 
                if(respuesta){
                    setUrlJuego(urlIntroducida);
                    Alert.alert("Tarea enviada correctamente.");
                    navigation.goBack();
                }else{
                    Alert.alert("Error al enviar la tarea.");
                }
            }else{
                Alert.alert("Error", "Debe introducir un URL válido.");
            }
        }
    }
    useFocusEffect(
        useCallback(()=>{
            fetchExiteJuego();
            fetchPictogramas();
        return () => { 
            fetchExiteJuego();
        }
        },[])
    );
    return(
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== 'android' && 
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        {urlAtras && 
                            <Image source={{uri: urlAtras}} style={styles.imageContainer} />
                        }    
                    </TouchableOpacity>
                }
                <Text style={styles.titleHeader}>Aplicación Juego</Text>
            </View>
            <View style={styles.body}>
                {urlJuego === null ? (
                    <Input
                    placeholder="Introducir url"
                    inputStyle={styles.input} 
                    onChangeText={(text) => setUrlIntroducida(text)}
                    rightIcon={
                        <TouchableOpacity onPress={()=> handleAceptarPress()}>
                            <Icon
                                name= "checkmark-outline"
                                type = "ionicon"
                            />
                        </TouchableOpacity>
                    }
                />):(
                    <View style={styles.eliminaJuego}>
                        <Text style={styles.text}>Ya existe una tarea de juego.</Text>
                        <View style={styles.button}>
                            <Button title="Eliminar Juego" onPress={()=> handleEliminarJuegoPress()} />
                        </View>
                    </View> 
                )}
                
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
    imageContainer: { 
        width: 50,
        height: 50,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: "bold",
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    input: {
        
    },
    eliminaJuego: {
        marginTop: 20,
        marginBottom: 10,
        alignContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#B4D2E7",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});
export default TareaJuego;
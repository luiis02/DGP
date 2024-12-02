import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { Input } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { postTareaJuego } from "../../api/apiTarea";

const TareaJuego = () => {
    const [urlAtras, setUrlAtras] = useState(null); 
    const [urlJuego, setUrlJuego] = useState(null); 
    const [exiteJuego, setExiteJuego] = useState(false);
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
    function esURL(cadena) {
        const patronURL = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-.~:?#[\]@!$&'()*+,;=]*)*\/?$/;
        return patronURL.test(cadena);
      }
    const handleAceptarPress = async () => {
        if(!urlJuego){
            Alert.alert("Error", "Debe introducir un URL válido.");
        }else {
            if(esURL(urlJuego)){ 
                const respuesta = await postTareaJuego(urlJuego); 
                if(respuesta){
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
    useEffect(() => {
        fetchPictogramas();
    }, []);
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
                <Input
                    placeholder="Introducir url"
                    inputStyle={styles.input} 
                    onChangeText={(text) => setUrlJuego(text)}
                    rightIcon={
                        <TouchableOpacity onPress={()=> handleAceptarPress()}>
                            <Icon
                                name= "checkmark-outline"
                                type = "ionicon"
                            />
                        </TouchableOpacity>
                    }
                />
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
});
export default TareaJuego;
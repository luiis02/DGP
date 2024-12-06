import React, { useEffect, useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { obtenerPictograma } from "../../api/apiArasaac";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/base";
import { Button } from "@rneui/themed";
import { putProfesor } from "../../api/apiUsuario";

const ResetContraseña = ({route}) => {
    const {profesores} = route.params;
    const [urlAtras, setUrlAtras] = useState(null); 
    const [username, setUsername] = useState('');  // Campo para ingresar el nombre de usuario
    const [password, setPassword] = useState('');
    const pictogramas = { 
        atras: "38249/38249_2500.png",  // Pictograma para volver atrás
    }
    const navigation = useNavigation(); 
    const fetchPictograma = async () => {
        // Obtiene el pictograma del alumno
        const url = await obtenerPictograma(pictogramas.atras);
        if (url){
            setUrlAtras(url);
        }else{
            Alert.alert("Error al obtener el pictograma.");  // Muestra un mensaje de error si no se pudo obtener el pictograma
        }
        
    }
    const handleCambiarPress = async () => {
        const buscarProfesor = profesores.find(prof => prof.nombre_usuario === username)
        if (buscarProfesor){
            const profesor = {
                contraseña: password,
                id: buscarProfesor.id,
            }
            console.log(profesor)
            const respuesta = await putProfesor(profesor);
            if(respuesta){
                Alert.alert("Contraseña cambiada exitosamente.");  // Muestra un mensaje de éxito si se cambió la contraseña
                navigation.goBack();  // Redirige a la pantalla anterior (Home)
            }else { 
                Alert.alert("Error", "No se pudo cambiar la contraseña.");  // Muestra un mensaje de error si no se pudo cambiar la contraseña
            }
        } else {
            Alert.alert("Error", "No se encuentra el nombre de usuario.");  // Muestra un mensaje de error si no se encuentra el nombre de usuario
    
        }
    }
    useEffect(() => {
        console.log(profesores)
        fetchPictograma();  // Ejecuta la función fetchPictograma al cargar el componente
    }, []);  // Se ejecuta solo una vez al cargar el componente

    // Implementación para el reseteo de contraseña
    return (
        <Layaout>
            <View style={styles.header}>
            {Platform.OS !== "android" && 
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Image
                    source={{uri: urlAtras}}
                    style={styles.iconButton}
                />
                <Text style={styles.textHeader}>Atras</Text>
            </TouchableOpacity>
            }
            <Text style={styles.textHeader}>Cambiar Contraseña</Text>
            </View>
            <View style={styles.body}>
                <Input
                    placeholder="Nombre de usuario"
                    inputStyle={styles.input}
                    value={username}
                    onChangeText={setUsername}  // Se actualiza el estado username al escribir en el input
                />
                <Input
                    placeholder="Nueva contraseña"
                    inputStyle={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}  // Se actualiza el estado password al escribir en el input
                />
            </View>
            <View style={styles.footer}>
                {username && password && 
                    <View style={styles.buttonContainer}>
                        <Button
                        title="Cambiar Contraseña"
                        buttonStyle={styles.button}
                        titleStyle={{color: 'black', fontWeight: 'bold'}}
                        onPress={handleCambiarPress}
                        />
                    </View>
                }
            </View>
        </Layaout>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
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
    input: {
        marginBottom: 10,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#94C5CC',
        borderRadius: 10,
        paddingHorizontal: 20,
    },
});  // Se exporta el componente ResetContraseña con sus estilos
export default ResetContraseña;
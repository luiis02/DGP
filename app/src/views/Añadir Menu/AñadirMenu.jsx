import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import Layaout from '../../components/Layaout/Layaout';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { createMenu } from '../../api/apiTarea';
const AñadirMenu = ({route}) => { 
    const [urlAtras, setUrlAtras] = useState(""); 
    const [nombre, setNombre] = useState(""); 
    const [pictograma, setPictograma] = useState(null);
    const [cantidad, setCantidad] = useState(0);

    const pictogramas = { 
        atras: "38249/38249_2500.png",
    }
    const fetchPictogramas = async () => { 
        const respuesta = await obtenerPictograma(pictogramas.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        }
    }
    const handleAñadirPictogramaPress = async () => {
        navigation.navigate("SeleccionarIcono", {name: nombre, cantidad: cantidad});
    }; 
    const handleAñadirMenuPress = async () => {
        const request = { 
            nombre: nombre, 
            cantidad: cantidad, 
        }
        const response = await createMenu(request); 
        if(response){
            Alert.alert("Menu añadido correctamente")
            navigation.goBack();
        }
        else{
            Alert.alert("Error al añadir el menú.");
        }
    }
    const navigation = useNavigation();
    useEffect(()=>{
        fetchPictogramas();
    },[]);
    // Capturar la url de la imagen al volver
    useEffect(() => {
        if (route.params?.urlImage) {
            setNombre(route.params.nombre); 
            setCantidad(route.params.cantidad); 
            setPictograma(route.params.urlImage);  // Guardamos la imagen seleccionada
        }
    }, [route.params?.urlImage]);
    useEffect(()=>{
        console.log(pictograma)
    }, [pictograma])
    return (
        <Layaout>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={{uri: urlAtras}} style={styles.icon} /> 
                </TouchableOpacity>
                <Text style={styles.title}>Añadir Menú</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput 
                    style={styles.input} 
                    value={nombre} 
                    onChangeText={setNombre}
                />
                <Text style={styles.label}>Cantidad:</Text>
                <TextInput 
                    style={styles.input} 
                    value={String(cantidad)} 
                    onChangeText={setCantidad}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={()=>handleAñadirMenuPress()}>
                    <Text style={styles.buttonText}>Añadir</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
    }, 
    icon: { 
        width: 50, 
        height: 50, 
    },
    title: { 
        fontSize: 20, 
        fontWeight: 'bold', 
    },
    body: {
        paddingHorizontal: 20, 
        paddingVertical: 20, 
        flex: 1, 
    },
    label: {
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 10,
    },
    input: {
        height: 40, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginBottom: 20, 
        paddingHorizontal: 10,
    },
    pictograma: {
        width: 100, 
        height: 100, 
        marginBottom: 20, 
        borderRadius: 5,  
    },
    pictogramaImage: {
        width: '100%', 
        height: '100%', 
    },
    añadirPictorgrama: {
        marginTop: 20, 
        backgroundColor: '#4CAF50', 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        borderRadius: 5, 
        marginBottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text: {
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold', 
    },
    button: {
        backgroundColor: '#4CAF50', 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        borderRadius: 5, 
        marginBottom: 20, 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    buttonText: {
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold', 
    },

});
export default AñadirMenu;
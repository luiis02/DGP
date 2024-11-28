import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert, StyleSheet, SafeAreaView } from 'react-native';
import Layaout from '../../components/Layaout/Layaout';
import { useNavigation } from '@react-navigation/native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { Image } from '@rneui/base';

const HomeAlumno = ({route}) => { 
    const {alumno} = route.params; 
    const [urlCerrarSesion, setUrlCerrarSesion] = useState(null);
    const pictograma = { 
        cerrarSesion: "2806/2806_2500.png",  // Pictograma para cerrar sesión
    }
    const navigation = useNavigation();
    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma(pictograma.cerrarSesion);
        if (respuesta) {
            setUrlCerrarSesion(respuesta);
        }else{
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    };
    useEffect(() =>{ 
        fetchPictograma();
    }, []);
    return (
        <SafeAreaView style={{backgroundColor: alumno.color_tema, flex: 1}}>
            <View style={styles.header}> 
            <TouchableOpacity onPress={() => navigation.navigate('Home') }>
                <Image source={{ uri: urlCerrarSesion }} style={{ width: 50, height: 50 }} /> 
                <Text style={{fontSize: alumno.tamaño_letra}}>Cerrar Sesión</Text>   
            </TouchableOpacity> 
            <Text style={{fontSize: alumno.tamaño_letra, fontWeight: 'bold'}}> Página Principal</Text>
            </View>     
        </SafeAreaView>
            
            
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {},
    infoHeader: {
        padding: 10,
    },
    text: {
        fontSize: 16,
        padding: 10,
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})
export default HomeAlumno;
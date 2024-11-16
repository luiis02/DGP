import React, { useState, useEffect } from 'react';
import Layaout from '../../components/Layaout/Layaout';
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useNavigation } from '@react-navigation/native';

const InformacionUsuario = ({alumno}) => {
    const navigation = useNavigation(); // Aquí se utiliza useNavigation para navegar a otras vistas.
    const [urlAtras, setUrlAtras] = useState(null);
    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        }else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    };
    useEffect(()=>{
        fetchPictograma();
    }, [])
    return(
        <Layaout>
            <View>
               {Platform.OS !== 'android' &&
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    {urlAtras &&
                    <Image source={{uri: urlAtras}} style={{width: 50, height: 50}} />}
                </TouchableOpacity>
                }
                <Text> Alumno {alumno}</Text>
            </View>
        </Layaout>
    )
}

export default InformacionUsuario;
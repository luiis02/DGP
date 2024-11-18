import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "@rneui/themed";
import { Alert } from 'react-native';


const LoginAlumnos = ({route}) => { 
    const navigation = useNavigation();
    const { alumno } = route.params;
    const pictograma = { 
        atras: "38249/38249_2500.png",  // Pictograma para el botón "Atrás"
    }
    const figuras = [
        {name: 'cloudy-night-outline', color: '#0DA9F6', hash: 'a1b2c3' }, 
        {name: 'extension-puzzle-outline', color: '#708090', hash: 'd4e6f1' }, 
        {name: 'flash-outline', color: '#00CED1', hash: 'abcdefdef'}, 
        {name: 'radio-button-off-outline', color: '#FF7F50', hash: '800080' }, 
        {name: 'square-outline', color: '#9B30FF', hash: 'FFA500' }, 
        {name: 'star-outline', color: '#1E90FF', hash: '008000' }, 
    ]
    const [urlAtras, setUrlAtras] = useState(null); 
    const [contraseña, setContraseña] = useState([]);
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
    const handleFigurePress = (figura) => {
        if (contraseña.length < 7 ) {
            setContraseña([...contraseña, figura]);
        }
    }
    const eliminarUltimoElemento = () => {
        setContraseña(contraseña.slice(0, -1));
    }
    const comprobar = () => { 
        return contraseña.length === 7;
    }
    const handleSubmit = () => {
        const contraseñaConcatenada = contraseña.map((item) => item.hash).join('');
        if (contraseñaConcatenada === alumno.contraseña) {
            navigation.navigate('HomeAlumno', { alumno });
        } else {
            Alert.alert('Error', 'Contraseña incorrecta.');
        }
    }
    return (
        // Los estilos de tamaño de texto serán in line porque va con el valor de alumno
        <Layaout>
            <View style={{flex: 1, borderBlockColor:alumno.backGroundColor, padding: 20}}>
                <View style={styles.header}>
                    {Platform.OS !== 'android' && 
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={{ uri: urlAtras }} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                    }                
                    <Text style={styles.titleHeader}>Inicio de Sesión</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.infoHeader}>Alumno {alumno.nombre} {alumno.apellido}</Text>
                    <Text style={styles.info}>Contraseña</Text>
                </View>
                <View style={styles.inputContraseña}>
                    {figuras.map((figura, index) => (
                        <Button key={index} icon={<Icon 
                            name={figura.name}
                            type="ionicon"
                            color={figura.color}
                        />}
                        color='#F8F8F8'
                        onPress={() => handleFigurePress(figura)}
                        />
                    ))}
                </View>
                <View>
                    {contraseña.length > 0 &&
                    <Text style={styles.info}>Contraseña introducida</Text>}
                    {contraseña.length>0 &&                  
                    <View style={styles.input}>
                        {contraseña.map((item, index) => (
                            <Icon 
                                key={index}
                                name={item.name}
                                type="ionicon"
                                color={item.color}
                            />
                            
                        ))}
                    </View>}
                    {contraseña.length>0 &&
                        <Button title="Borrar" buttonStyle={styles.button} onPress={()=>eliminarUltimoElemento()} />
                    }
                    {comprobar() && 
                        <Button title="Ingresar" buttonStyle={styles.button} onPress={()=>handleSubmit()} />
                    }
                </View>
            </View>
        </Layaout>
    )
}
const styles = StyleSheet.create({
    header:{
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
   inputContraseña: {
    flexDirection: 'row',
    justifyContent:'space-between',
    flexGrow: 'grow',
    marginBottom: 20,
    },
    input: {
        flexDirection: 'row',
        justifyContent:'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#94C5CC',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default LoginAlumnos;
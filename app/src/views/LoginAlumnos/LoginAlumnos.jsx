import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, SafeAreaView, Alert } from "react-native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "@rneui/themed";

const LoginAlumnos = ({ route }) => {
    const navigation = useNavigation();
    const { alumno } = route.params;
    const pictograma = {
        atras: "38249/38249_2500.png",
    };

    const figuras = [
        { title: "nube", name: 'cloudy-night-outline', color: '#0DA9F6', hash: 'a1b2c3-' },
        { title: "puzzle", name: 'extension-puzzle-outline', color: '#708090', hash: 'd4e6f1-' },
        { title: "rayo", name: 'flash-outline', color: '#00CED1', hash: 'abcdefdef-' },
        { title: "circulo", name: 'radio-button-off-outline', color: '#FF7F50', hash: '800080-' },
        { title: "cuadrado", name: 'square-outline', color: '#9B30FF', hash: 'FFA500-' },
        { title: "estrella", name: 'star-outline', color: '#1E90FF', hash: '008000-' },
    ];

    const [urlAtras, setUrlAtras] = useState(null);
    const [contraseña, setContraseña] = useState([]);

    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    };

    useEffect(() => {
        fetchPictograma();
    }, []);

    const handleFigurePress = (figura) => {
        if (contraseña.length < 7) {
            setContraseña([...contraseña, figura]);
        }
    };

    const eliminarUltimoElemento = () => {
        setContraseña(contraseña.slice(0, -1));
    };

    const comprobar = () => {
        return contraseña.length === 7;
    };

    const handleSubmit = () => {
        const contraseñaConcatenada = contraseña.map((item) => item.hash).join('');
        if (contraseñaConcatenada === alumno.contraseña) {
            navigation.navigate('HomeAlumno', { alumno });
        } else {
            Alert.alert('Error', 'Contraseña incorrecta.');
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: alumno.color_tema, flex: 1 }}>
            <View style={{ flex: 1, padding: 20 }}>
                <View style={styles.header}>
                    {Platform.OS !== 'android' &&
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={{ uri: urlAtras }} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                    }
                    <Text style={[styles.titleHeader, { fontSize: alumno.tamaño_letra }]}>Inicio de Sesión</Text>
                </View>

                <Text style={[styles.infoHeader, { fontSize: alumno.tamaño_letra }]}>Alumno {alumno.nombre} {alumno.apellido}</Text>

                <View style={styles.grid}>
                    {figuras.map((figura, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.iconButton, { backgroundColor: figura.color }]}
                            onPress={() => handleFigurePress(figura)}
                        >
                            <Icon name={figura.name} type="ionicon" color="#fff" size={40} />
                        </TouchableOpacity>
                    ))}
                </View>

                {contraseña.length > 0 && (
                    <>
                        <Text style={[styles.info, { fontSize: alumno.tamaño_letra }]}>Contraseña introducida:</Text>
                        <View style={styles.input}>
                            {contraseña.map((item, index) => (
                                <Icon key={index} name={item.name} type="ionicon" color={item.color} size={30} />
                            ))}
                        </View>
                        <Button title="Borrar" buttonStyle={styles.button} onPress={eliminarUltimoElemento} />
                        {comprobar() && <Button title="Ingresar" buttonStyle={styles.button} onPress={handleSubmit} />}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleHeader: {
        fontWeight: 'bold',
        color: 'black',
    },
    infoHeader: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    iconButton: {
        width: '30%',
        margin: '1.5%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
    },
    button: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#94C5CC',
    },
});

export default LoginAlumnos;

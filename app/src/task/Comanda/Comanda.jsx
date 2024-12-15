import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAllMenus } from '../../api/apiTarea';
import { Input } from 'react-native-elements';

const Comanda = ({ route }) => {
    const { alumno } = route.params;
    const [aula, setAula] = useState("A");
    const [cantidad, setCantidad] = useState(0);
    const [nombreMenu, setNombreMenu] = useState("");
    const [cantidadComanda, setCantidadComanda] = useState(0);
    const pictogramas = {
        atras: "38249/38249_2500.png", // Icono de atrás
    };
    const [urlAtras, setUrlAtras] = useState("");
    const [menus, setMenus] = useState(null);

    const fetchMenu = async () => {
        try {
            // Obtiene el pictograma del alumno
            const data = await getAllMenus();

            // Verifica si los datos son un array y contienen al menos un elemento
            if (Array.isArray(data) && data.length > 0) {
                // Toma el primer elemento del array
                const [id, nombre, url, cantidad] = data[0];

                // Asigna los valores correspondientes
                setCantidad(cantidad); // Último elemento
                setNombreMenu(nombre); // Segundo elemento
                setMenus(data); // Guarda la lista completa de menús, si es necesario
            } else {
                Alert.alert("Error", "No se encontraron datos de los menús.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Hubo un problema al obtener los datos del menú.");
        }
    };

    const fetchPictograma = async () => {
        // Obtiene el pictograma del alumno
        const url = await obtenerPictograma(pictogramas.atras);
        setUrlAtras(url);
    };

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            fetchMenu();
            fetchPictograma();
        }, [aula]) // Dependencia en "aula"
    );

    useEffect(() => {
        console.log("Menus: " + menus);
        console.log("Cantidad: " + cantidad);
        console.log("Nombre del menú: " + nombreMenu);
    }, [menus]);

    // Función para ir al siguiente aula
    const handleSiguiente = () => {
        if (aula < "F") {
            setAula((prevAula) => String.fromCharCode(prevAula.charCodeAt(0) + 1));
        } else {
            Alert.alert("Aviso", "Ya estás en el último aula.");
        }
    };

    // Función para ir al aula anterior
    const handleAnterior = () => {
        if (aula > "A") {
            setAula((prevAula) => String.fromCharCode(prevAula.charCodeAt(0) - 1));
        } else {
            Alert.alert("Aviso", "Ya estás en el primer aula.");
        }
    };

    return (
        <SafeAreaView style={[{ backgroundColor: alumno.color_tema, fontSize: alumno.tamaño_letra }, styles.container]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={{ uri: urlAtras }} style={styles.imagenAtras} />
                    <Text style={[styles.textHeader, { fontSize: alumno.tamaño_letra }]}>Atrás</Text>
                </TouchableOpacity>
                <Text style={[styles.titleHeader, { fontSize: alumno.tamaño_letra }]}>Comanda Aula: {aula}</Text>
            </View>
            <View style={styles.body}>
                <Text style={[{ fontSize: alumno.tamaño_letra }, styles.menu]}>Menú: {nombreMenu}</Text>
                <Text style={[{ fontSize: alumno.tamaño_letra }, styles.menu]}>Cantidad: {cantidad}</Text>
                <Input
                    placeholder='Cantidad'
                    value={cantidadComanda}
                    onChangeText={(value) => setCantidadComanda(Number(value))}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleAnterior}>
                    <Text style={styles.buttonText}>Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSiguiente}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    imagenAtras: {
        width: 50,
        height: 50,
    },
    textHeader: {
        fontWeight: 'bold',
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
    },
    menu: {
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Comanda;

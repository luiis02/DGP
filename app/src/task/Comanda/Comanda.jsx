import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAllMenus, getTareasComandaPorAlumno } from '../../api/apiTarea';
import { Input } from 'react-native-elements';

const Comanda = ({ route }) => {
    const { alumno } = route.params;
    const [aula, setAula] = useState("A");
    const [menus, setMenus] = useState([]);
    const [hayMenus, setHayMenus] = useState(false);
    const [cantidad, setCantidad] = useState(0);  // Cantidad seleccionada
    const [indiceMenu, setIndiceMenu] = useState(0);  // Estado para el índice del menú seleccionado

    const pictogramas = {
        atras: "38249/38249_2500.png", // Icono de atrás
    };

    const [urlAtras, setUrlAtras] = useState("");

    const consultaTarea = async () => {
        const response = await getTareasComandaPorAlumno(alumno.id);
        if (response.message !== "No se encontraron tareas para el alumno especificado") {
            setHayMenus(true);
            const data = await getAllMenus();
            setMenus(data);
        }
    }

    const fetchPictograma = async () => {
        const url = await obtenerPictograma(pictogramas.atras);
        setUrlAtras(url);
    };

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            fetchPictograma();
        }, [aula]) // Dependencia en "aula"
    );

    useEffect(() => {
        consultaTarea(); // Este método debe ser llamado cada vez que se cambia el alumno o la comanda
    }, [alumno]);

    // Función para actualizar la cantidad seleccionada
    const handleCantidadChange = (value) => {
        setCantidad(Number(value));
    };

    // Función para ir al siguiente menú
    const handleSiguienteMenu = () => {
        if (indiceMenu < menus.length - 1) {
            setIndiceMenu(prevIndice => prevIndice + 1);
        } else {
            Alert.alert("Aviso", "Ya estás en el último menú.");
        }
    };

    // Función para ir al menú anterior
    const handleAnteriorMenu = () => {
        if (indiceMenu > 0) {
            setIndiceMenu(prevIndice => prevIndice - 1);
        } else {
            Alert.alert("Aviso", "Ya estás en el primer menú.");
        }
    };

    // Función para ir a la siguiente aula
    const handleSiguienteAula = () => {
        if (aula < "F") {
            setAula(prevAula => String.fromCharCode(prevAula.charCodeAt(0) + 1));
        } else {
            Alert.alert("Aviso", "Ya estás en el último aula.");
        }
    };

    // Función para ir al aula anterior
    const handleAnteriorAula = () => {
        if (aula > "A") {
            setAula(prevAula => String.fromCharCode(prevAula.charCodeAt(0) - 1));
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
            </View>
            {hayMenus ? (
                <View style={styles.body}>
                    <Text style={[styles.titleHeader, { fontSize: alumno.tamaño_letra, alignItems: 'flex-end' }]}>Comanda Aula: {aula}</Text>
                    <View style={styles.menu}>
                        <Text>Menú: {menus[indiceMenu]?.nombre}</Text>
                        <Image 
                            source={{uri: menus[indiceMenu]?.imagen_url}}
                            style={styles.image}/>
                        <Input
                            placeholder="Cantidad"
                            value={String(cantidad)}
                            onChangeText={handleCantidadChange}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.boxNohayTarea}>
                    <Text style={[{ fontSize: "50" }, styles.noHayTarea]}> 🎉</Text>
                    <Text style={[{ fontSize: "50" }, styles.noHayTarea]}> No hay tarea </Text>
                    <Text style={[{ fontSize: "50" }, styles.noHayTarea]}> 🎉</Text>
                </View>
            )}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleAnteriorMenu}>
                    <Text style={styles.buttonText}>Menú Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSiguienteMenu}>
                    <Text style={styles.buttonText}>Menú Siguiente</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleAnteriorAula}>
                    <Text style={styles.buttonText}>Aula Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSiguienteAula}>
                    <Text style={styles.buttonText}>Aula Siguiente</Text>
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
        marginVertical: 10,
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
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    boxNohayTarea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noHayTarea: {
        fontWeight: 'bold',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginVertical: 10,
    },
});

export default Comanda;

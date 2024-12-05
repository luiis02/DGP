import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert, FlatList, TextInput, Platform, Button } from 'react-native';
import { getMenu } from '../../test/Menu';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useNavigation } from '@react-navigation/native';

const Comanda = ({ route }) => {
    let  { descripcion, aula, alumno } = route.params;
    const [listaMenu, setListaMenu] = useState([]);
    const [menu, setMenu] = useState([]);
    const [urlAtras, setUrlAtras] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const pictogramas = {
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation();

    const fetchMenu = () => {
        const respuesta = getMenu();
        if (respuesta) {
            setMenu(respuesta);
        } else {
            console.error('Error al obtener el menu:', respuesta.error);
        }
    }

    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma(pictogramas.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.error('Error al obtener el pictograma:', respuesta.error);
        }
    }

    const renderMenu = ({ item }) => (
        <View style={styles.menuItem}>
            <Image source={{ uri: item.urlPictograma }} style={styles.menuImage} />
            <Text style={styles.menuText}>{item.nombre}</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese la cantidad"
                value={item.cantidad.toString()}
                onChangeText={(text) => setCantidad(text)}
                keyboardType="numeric"
            />
        </View>
    );

    const handleNext = () => {
        if (currentIndex < menu.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const handleNextClassroom = () => {
        switch(aula){
            case 'A': aula='B'; break;
            case 'B': aula='C'; break;
            case 'C': aula='D'; break;
            case 'D': aula='E'; break;
            case 'E': aula='F'; break;
        }
        navigation.navigate('Comanda', {descripcion: descripcion, aula: aula, alumno: alumno})
    }

    const handlePreviousClassroom = () => {
        switch(aula){
            case 'B': aula='A'; break;
            case 'C': aula='B'; break;
            case 'D': aula='C'; break;
            case 'E': aula='D'; break;
            case 'F': aula='E'; break;
        }
        navigation.navigate('Comanda', {descripcion: descripcion, aula: aula, alumno: alumno})
    }

    useEffect(() => {
        fetchPictograma();
        fetchMenu();
    }, []);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: alumno.color_tema }]}>
            {descripcion === "SIN PICTOGRAMA" ? (
                <>
                    <View style={styles.header}>
                        {Platform.OS !== "android" &&
                            <TouchableOpacity style={styles.buttonTouchable} onPress={() => navigation.goBack()}>
                                <Image source={{ uri: urlAtras }} style={styles.imagebutton} />
                                <Text style={[styles.text, { fontSize: alumno.tamaño_letra }]}>Atras</Text>
                            </TouchableOpacity>
                        }
                        <Text style={[styles.text, { fontSize: alumno.tamaño_letra }]}>Aula {aula}</Text>
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            data={menu.slice(currentIndex, currentIndex + 1)}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderMenu}
                            numColumns={1}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                        />
                        <View style={styles.navigationButtons}>
                            <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
                                <Text style={styles.navButtonText}>Menú anterior</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
                                <Text style={styles.navButtonText}>Siguiente menú</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        {aula !== 'A' &&
                        <Button title=" Aula anterior"
                                buttonStyle={styles.footerButton}
                                onPress={handlePreviousClassroom}
                        />
                        }
                        { aula !== 'F' && 
                        <Button title='Siguiente Aula'
                                buttonStyle={styles.footerButton}
                                onPress={handleNextClassroom}
                        />
                        }
                    </View>
                </>
            ) : (
                <Text>Con pictograma</Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonTouchable: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagebutton: {
        width: 50,
        height: 50,
    },
    text: {
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        alignItems: 'center',
        marginBottom: 20,
    },
    menuImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    menuText: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 200,
        textAlign: 'center',
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    navButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    footerButton: {
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
    },
    footerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Comanda;

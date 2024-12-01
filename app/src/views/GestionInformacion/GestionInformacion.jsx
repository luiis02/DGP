import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Icon, Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getEstudiantes } from "../../api/apiUsuario";



const GestionInformacion = () => { 
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    };
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);

    const [alumnos, setAlumnos] = useState([]);
    const [filteredAlumnos, setFilteredAlumnos] = useState([]);
    const [filter, setFilter] = useState("");

    // Utilidad para dar formato a las fechas:
    const formatearFecha = (cadenaFecha) => {
        const date = new Date(cadenaFecha); // Convertir la cadena en objeto Date
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'short' }).format(date);
    };

    // Función para manejar el filtro:
    const handleFilterSubmit = () => {
        // Filtrar los estudiantes por nombre o apellido
        const filteredData = alumnos.filter((item) => {
            const fullName = `${item.nombre} ${item.apellido}`.toLowerCase();
            return fullName.includes(filter.toLowerCase());
        });

        // Actualizar el estado de los estudiantes filtrados
        setFilteredAlumnos(filteredData);
    }
    
    // Consultas a la BD:
    const fetch = async () => {

        // Obtener el pictograma del icono de retroceso de página:
        const respuesta = await obtenerPictograma(pictogramas.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }

        // Obtener todos los alumnos:
        const data = await getEstudiantes(); 
        if (data) {
            setAlumnos(data);
            setFilteredAlumnos(data); // Inicializamos los estudiantes filtrados con todos los estudiantes
        } else {
            Alert.alert("Error al obtener los alumnos.");
        }
        
    }
    
    useEffect(() => {
        fetch();
    }, []);



    return (
        <Layaout>
            {/* Título de la pantalla */}
            <View style={styles.header}>
                {Platform.OS !== 'android' &&
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {urlAtras && <Image source={{ uri: urlAtras }} style={styles.iconBack} />}
                    </TouchableOpacity>
                }

                <Text style={styles.titleHeader}>Informes de alumnos</Text>
            </View>

            <View style={styles.body}>
                {/* Filtro de búsqueda arriba */}
                <View style={styles.filtrar}>
                    <Input 
                        placeholder="Filtrar por nombre o apellido"
                        inputStyle={{alignItems: 'center'}}
                        value={filter} // Vinculamos el estado al input
                        onChangeText={(text) => setFilter(text)} // Actualiza el estado al escribir
                        rightIcon={
                            <TouchableOpacity onPress={handleFilterSubmit}>
                                <Icon name="search" size={24} color="black" />
                            </TouchableOpacity>
                        }
                    />
                </View>

                {/* Contenido de los estudiantes filtrados en el medio */}
                <ScrollView style={styles.scrollView}>
                    {filteredAlumnos.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.item} 
                            onPress={() => {
                                navigation.navigate('HistorialTareas', {alumno: item, admin: true})
                                }
                            }
                        >
                            <Image source={{uri: item.foto_perfil}} style={{width: 80, height: 80, borderRadius: 40}} />
                            <Text style={styles.itemText}>{item.nombre} {item.apellido}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </Layaout>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBack: {
        width: 50,
        height: 50,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    body: {
        flex: 1,
        justifyContent: 'space-between',
    },
    filtrar: {
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },    
    item: {
        flexDirection: 'row',
        paddingLeft: 3,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
    },
    itemText: {
        flex: 1,
        fontSize: 13,
        textAlign: 'center',
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cabecera: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contenedorCabecera: {
        marginBottom: 50,
    }
});

export default GestionInformacion;
import React, { useState, useEffect } from 'react';
import Layaout from '../../components/Layaout/Layaout';
import { Text, View, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from '@rneui/themed';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { deleteMaterial, putMaterial } from '../../api/apiInventario'; 

const InformacionMaterial = ({ route }) => {
    const { material } = route.params || {};
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);

    const fechaActual     = new Date();
    const fechaFormateada = format(fechaActual, 'yyyy-MM-dd');

    const [nombre, setNombre] = useState(material.nombre_material || '');
    const [descripcion, setDescripcion] = useState(material.descripcion || '');
    const [categoria, setCategoria] = useState(material.categoria || '');
    const [cantidad, setCantidad] = useState(material.cantidad || 0);
    const [estado, setEstado] = useState(material.estado || 'Disponible');
    const [fechaActualizacion, setFechaActualizacion] = useState(fechaFormateada);
    
    const pictograma = {
        atras: "38249/38249_2500.png",
    };

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

    const handleAceptarPress = async () => {
        const datosMaterial = {
            id_material: material.id_material, // ID del material a modificar
            nombre_material: nombre,          // Nuevo nombre
            descripcion: descripcion,         // Nueva descripción
            categoria: categoria,             // Nueva categoría
            cantidad: parseInt(cantidad, 10), // Nueva cantidad
            estado: estado,                   // Nuevo estado
        };
    
        const resultado = await putMaterial(datosMaterial);

        if (resultado) {
            Alert.alert("Material modificado correctamente.");
            navigation.navigate('GestionInventario', {idAdmin: material.id_administrador});
        } else {
            Alert.alert("Error al modificar el material.");
        }
    };

    const handleEliminarPress = async () => {
        const response = await deleteMaterial(material.id_material)
        
        if (response) {
            Alert.alert("Material eliminado correctamente.");
            navigation.navigate('GestionInventario', {idAdmin: material.id_administrador});
        } else{
            Alert.alert("Error al modificar el material.");
        }
    };


    return (
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== 'android' && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {urlAtras && <Image source={{ uri: urlAtras }} style={{ width: 50, height: 50 }} />}
                    </TouchableOpacity>
                )}
                <Text style={styles.titleHeader}>Modificar material</Text>
            </View>


            <View style={styles.body}>
                <Input
                    style={styles.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <Input
                    style={styles.input}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                />
                <Input
                    style={styles.input}
                    placeholder="Categoría"
                    value={categoria}
                    onChangeText={setCategoria}
                />
                <Input
                    style={styles.input}
                    placeholder="Cantidad"
                    value={cantidad.toString()}
                    onChangeText={setCantidad}
                />
                <Input
                    style={styles.input}
                    placeholder="Estado"
                    value={estado}
                    onChangeText={setEstado}
                />


                <View style={styles.actions}>
                    <Button title="Aceptar" buttonStyle={styles.acceptButton} onPress={handleAceptarPress} />
                    <Button title="Eliminar Material" buttonStyle={styles.deleteButton} onPress={handleEliminarPress} />
                </View>
            </View>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F8F8F8',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        padding: 20,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#FF5722',
    },
});

export default InformacionMaterial;
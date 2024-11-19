import React, { useState, useEffect } from 'react';
import Layaout from '../../components/Layaout/Layaout';
import { Text, View, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from '@rneui/themed';
import { Alert } from 'react-native';
import { format } from 'date-fns';
/* import { putEstudiante, deleteEstudiante, deleteImage } from '../../api/api'; */

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
            nombre_material: nombre,
            descripcion: descripcion,
            categoria: categoria,
            cantidad: cantidad,
            estado: estado,
            ultima_actualizacion: fechaActualizacion
        };

        try {
            const response = await fetch(`http://localhost:5000/materiales/${material.id_material}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(datosMaterial),
            });
        
            if (!response.ok) {
              throw new Error('Error al actualizar el material');
            }
        
            const data = await response.json();
            console.log('Material actualizado:', data);
            Alert.alert("Material actualizado correctamente.");
            navigation.navigate('GestionInventario', {idAdmin: material.id_administrador});
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleEliminarPress = async () => {
        try {
            const response = await fetch(`http://localhost:5000/materiales/${material.id_material}`, {
                method: 'DELETE',
            });
        
            if (!response.ok) {
                throw new Error('Error al eliminar el material');
            }
        
            const data = await response.json();
            console.log('Material eliminado:', data);
        } catch (error) {
            console.error('Error:', error.message);
        }

        Alert.alert("Material eliminado correctamente.");
        navigation.navigate('GestionInventario', {idAdmin: material.id_administrador});
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
                    value={cantidad}
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
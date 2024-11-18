import React, { useState, useEffect } from 'react';
import Layaout from '../../components/Layaout/Layaout';
import { Text, View, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from '@rneui/themed';
import { Alert } from 'react-native';
import { putEstudiante, deleteEstudiante, deleteImage } from '../../api/api'; // Asume que tienes la API configurada

const InformacionUsuario = ({ route }) => {
    const { alumno } = route.params;
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);
    const [nombre, setNombre] = useState(alumno.nombre || '');
    const [apellido, setApellido] = useState(alumno.apellido || '');
    const [nombreUsuario, setNombreUsuario] = useState(alumno.nombre_usuario || '');
    const [fotoPerfil, setFotoPerfil] = useState(alumno.foto_perfil || null);
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

    const handleImagenChange = async () => {
        // Solicitar permisos para acceder a la galería
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        alert('Se requieren permisos para acceder a la galería.');
        return;
        }

        // Abrir el selector de imágenes
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
            setFotoPerfil(result.assets[0].uri); // Guardar la URI de la imagen seleccionada
        }
    };

    const handleAceptarPress = async () => {
        
        await deleteImage(alumno.id + '.jpg')
        const urlFotoPerfil = await postImagen({ fotoUri: fotoPerfil, nombre: nombreUsuario });
        if (urlFotoPerfil){
            const datosAlumno = {
                nombre,
                apellido,
                nombre_usuario: nombreUsuario,
                foto_perfil: urlFotoPerfil, // Actualizar foto
            };
            const respuesta = await putEstudiante(datosAlumno);
            if (respuesta) {
                Alert.alert('Éxito', 'Alumno actualizado correctamente.');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'No se pudo actualizar el alumno.');
            }
        }
    };

    const handleEliminarPress = async () => {
        // Llamar a la API para eliminar el alumno
        if (respuesta) {
            Alert.alert('Éxito', 'Alumno eliminado correctamente.');
            navigation.goBack();
        } else {
            Alert.alert('Error', 'No se pudo eliminar el alumno.');
        }
    };

    const handleEliminarFotoPress = async () => {
        await deleteImage(alumno.id + "jpg");
        setFotoPerfil(null); // Eliminar la foto
    };
    return (
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== 'android' && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {urlAtras && <Image source={{ uri: urlAtras }} style={{ width: 50, height: 50 }} />}
                    </TouchableOpacity>
                )}
                <Text style={styles.titleHeader}>Modificar Alumno</Text>
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
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                />
                <Input
                    style={styles.input}
                    placeholder="Nombre de Usuario"
                    value={nombreUsuario}
                    onChangeText={setNombreUsuario}
                />
                <Button title="Cambiar Foto de Perfil" buttonStyle={styles.button} onPress={handleImagenChange} />
                {fotoPerfil && (
                    <View>
                        <Image source={{ uri: fotoPerfil }} style={{ width: 100, height: 100 }} />
                        <Button title="Eliminar Foto" buttonStyle={styles.button} onPress={() => handleEliminarFotoPress} />
                    </View>
                )}
                <View style={styles.actions}>
                    <Button title="Aceptar" buttonStyle={styles.acceptButton} onPress={handleAceptarPress} />
                    <Button title="Eliminar Alumno" buttonStyle={styles.deleteButton} onPress={handleEliminarPress} />
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

export default InformacionUsuario;

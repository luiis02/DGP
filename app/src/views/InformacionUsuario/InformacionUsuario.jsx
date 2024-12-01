import React, { useState, useEffect } from 'react';
import Layaout from '../../components/Layaout/Layaout';
import { Text, View, Image, TouchableOpacity, Platform, StyleSheet, Alert, ScrollView } from 'react-native';
import { Input, Button, Icon } from '@rneui/themed';
import { obtenerPictograma } from '../../api/apiArasaac';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { putEstudiante, deleteEstudiante } from '../../api/apiUsuario';
import { deleteImage, postImagen } from '../../api/apiImage';
import { Checkbox } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const InformacionUsuario = ({ route }) => {
    const { alumno } = route.params;
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);
    const [nombre, setNombre] = useState(alumno.nombre);
    const [apellido, setApellido] = useState(alumno.apellido);
    const [backGroundColor, setBackGroundColor] = useState(alumno.color_fondo);
    const [fontSize, setFontSize] = useState(alumno.tamaño_letras);
    const [fotoPerfil, setFotoPerfil] = useState(alumno.foto_perfil);
    const [contraseña, setContraseña] = useState([]);
    const [opcionVisualizacion, setOpcionVisualizacion] = useState([
        { id: 1, label: 'Tactil', selected: alumno.opciones_visualizacion?.includes('Tactil') },
        { id: 2, label: 'Lector de pantalla', selected: alumno.opciones_visualizacion?.includes('Lector de pantalla') },
        { id: 3, label: 'Navegación con el teclado', selected: alumno.opciones_visualizacion?.includes('Navegación con el teclado') },
        { id: 4, label: 'Lector de texto', selected: alumno.opciones_visualizacion?.includes('Lector de texto') },
    ]);
    const [prefereciasAccesibilidades, setPreferenciasAccesibilidades] = useState([
        { id: 1, label: 'Texto', selected: alumno.preferencias_accesibilidad?.includes('Texto') },
        { id: 2, label: 'Pictogramas', selected: alumno.preferencias_accesibilidad?.includes('Pictogramas') },
        { id: 3, label: 'Audio', selected: alumno.preferencias_accesibilidad?.includes('Audio') },
        { id: 4, label: 'Video', selected: alumno.preferencias_accesibilidad?.includes('Video') },
    ]);

   const [fotoCambiada, setFotoCambiada] = useState(false);
    const figuras = [
        { title: "nube", name: 'cloudy-night-outline', color: '#0DA9F6', hash: 'a1b2c3-' },
        { title: "puzzle", name: 'extension-puzzle-outline', color: '#708090', hash: 'd4e6f1-' },
        { title: "rayo", name: 'flash-outline', color: '#00CED1', hash: 'abcdefdef-' },
        { title: "circulo", name: 'radio-button-off-outline', color: '#FF7F50', hash: '800080-' },
        { title: "cuadrado", name: 'square-outline', color: '#9B30FF', hash: 'FFA500-' },
        { title: "estrella", name:'star-outline', color: '#1E90FF', hash: '008000-' },
    ]
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
        const contraseñaLetras = alumno.contraseña.split('-', 7); // Divide la contraseña en partes
        const newContraseña = []; // Para almacenar los valores correctos de la contraseña
        for (let i = 0; i < contraseñaLetras.length; i++) {
            for (let j = 0; j < figuras.length; j++) {
                if (figuras[j].hash.split('-')[0] === contraseñaLetras[i]) {
                    newContraseña.push(figuras[j]); // Agrega la figura a la nueva lista
                    break; // Si encuentra la coincidencia, sale del loop interno
                }
            }
        }
        // Actualiza el estado de la contraseña con las figuras encontradas
        setContraseña(newContraseña);
        fetchPictograma();
    }, [alumno]);
    

    const handleImagenChange = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Error', 'Se requieren permisos para acceder a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFotoPerfil(result.assets[0].uri);
            setFotoCambiada(true);
        }
    };

    const handleAceptarPress = async () => {
        let urlFotoPerfil = alumno.foto_perfil; 
        if (fotoCambiada) {
            await deleteImage(alumno.id + '.jpg');
            urlFotoPerfil = await postImagen({fotoUri: fotoPerfil, nombre: alumno.nombre_usuario})
            if(!urlFotoPerfil){
                Alert.alert('Error', 'No se pudo subir la imagen.');
            }
            setFotoCambiada(false);
        }
        const contraseñaConcatenada = contraseña.map((item) => item.hash).join('');
        const datosAlumno = {
            "nombre": nombre,
            "apellidos": apellido,
            "nombre_usuario": alumno.nombre_usuario,
            "contraseña": contraseñaConcatenada,
            "color_fondo": backGroundColor,
            "tamaño_letra": fontSize,
            "rol": "ESTUDIANTE",
            "id": alumno.id,
        };
        const respuesta = await putEstudiante(datosAlumno);
        if (respuesta) {
            Alert.alert('Éxito', 'Alumno actualizado correctamente.');
            navigation.navigate('GestionAlumnos')
        } else {
                Alert.alert('Error', 'No se pudo actualizar el alumno.');
        }
    };

    const handleEliminarPress = async () => {
        let respuesta = await deleteEstudiante(alumno.id);
        if (respuesta) {
            respuesta = await deleteImage(alumno.id)
            if (respuesta) {
                Alert.alert('Éxito', 'Alumno eliminado correctamente.');
                navigation.goBack();
            }else{
                Alert.alert('Error', 'No se pudo eliminar la imagen del alumno.');
            }
        } else {
            Alert.alert('Error', 'No se pudo eliminar el alumno.');
        }
    };

    const handleEliminarFotoPress = async () => {
        setFotoPerfil(null);
    };

    const toggleOption = (id) => {
        const updatedList = opcionVisualizacion.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setOpcionVisualizacion(updatedList);
    };

    const togglePreferenciaAccesibilidad = (id) => {
        const updatedList = prefereciasAccesibilidades.map((item) =>
            item.id === id? {...item, selected:!item.selected } : item
        );
        setPreferenciasAccesibilidades(updatedList);
    };

    const handleColorChange = (value) => {
        const hexColor = '#' + Math.floor(value * 16777215).toString(16).padStart(6, '0');
        setBackGroundColor(hexColor);
    };

    const handleFiguraPress = (figura) => {
        if(contraseña.length <7){
            setContraseña([...contraseña, figura]);
        }
    };

    return (
        <Layaout>
            <ScrollView>
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
                    <Button title="Seleccionar Foto de Perfil" 
                            buttonStyle={styles.button} 
                            onPress={handleImagenChange}/>
                    {fotoPerfil && (
                        <View style={styles.previewContainer}>
                            <Image source={{ uri: fotoPerfil }} style={styles.previewImage} />
                            <Button title="Eliminar Foto" 
                                    buttonStyle={styles.button}
                                    onPress={handleEliminarFotoPress} />
                        </View>
                    )}
                    <View style={styles.contraseñaContainer}>
                        <Text>Contraseña</Text>
                        <View style={styles.passwordContainer}>
                        {contraseña.map((figura, index) => (
                                <Button key={index} icon={<Icon 
                                        name={figura.name}
                                        type="ionicon"
                                        color={figura.color}
                                        />}
                                        color='#F8F8F8'
                                        style={{borderRadius: 10, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}
                                        />
                            ))}
                        </View>
                        <View>
                            {contraseña.length === 7 &&
                            <Button title="Eliminar contraseña" 
                                    buttonStyle={styles.button}
                                    onPress={()=>setContraseña([])}/>
                            }
                        </View>
                        <View style={styles.setContraseñaContainer}>
                            {contraseña.length < 7 &&
                            figuras.map((figura, index)=>{
                                return (
                                    <Button key={index} icon={<Icon 
                                            name={figura.name}
                                            type="ionicon"
                                            color={figura.color}
                                            />}
                                            color='#F8F8F8'
                                            onPress={()=> handleFiguraPress(figura)}
                                            style={{borderRadius: 10, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}
                                            />
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.optionContainer}>
                        <Text>Opciones de Visualización:</Text>
                        {opcionVisualizacion.map((option) => (
                            <View key={option.id} style={styles.option}>
                                <Checkbox
                                    status={option.selected ? 'checked' : 'unchecked'}
                                    onPress={() => toggleOption(option.id)}
                                />
                                <Text>{option.label}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.optionContainer}>
                        <Text>Preferencias de Accesibilidad:</Text>
                        {prefereciasAccesibilidades.map((preferencia, index) => (
                            <View key={index} style={styles.option}>
                                <Checkbox
                                    status={preferencia.selected ? 'checked' : 'unchecked'}
                                    onPress={() => togglePreferenciaAccesibilidad(preferencia.id)}
                                />
                                <Text>{preferencia.label}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.sliderContainer}>
                        <View>
                            <Text>Color de Fondo:</Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={{ width: 200, height: 40 }}
                                    minimumValue={0}
                                    maximumValue={1}
                                    step={0.01}
                                    onValueChange={handleColorChange}
                                />
                                <View style={{ marginLeft: 30, width: 70, height:30, backgroundColor:backGroundColor}}></View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sliderContainer}>
                        <View>
                            <Text>Tamaño de Letra:</Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={{ width: 200, height: 40 }}
                                    minimumValue={10}
                                    maximumValue={30}
                                    step={1}
                                    value={fontSize}
                                    onValueChange={(value) => setFontSize(value)}
                                />
                                <Text style={{fontSize: fontSize, marginBottom: 10, margin: 10}}>Tamaño</Text>
                            </View>
                            
                        </View>
                    </View>
                </View>
                
                <Button title="Guardar" onPress={handleAceptarPress} buttonStyle={styles.button} />
                <Button title="Eliminar" onPress={handleEliminarPress} buttonStyle={styles.button}/>
            </ScrollView>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    previewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    body: {
        padding: 20,
    },
    contraseñaContainer: {
        flexDirection: 'column',
        justifyContent:'space-between',
        flexGrow: 'grow',
        marginBottom: 20,
    },
    setContraseñaContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexGrow: 'grow',
        marginBottom: 20,
    },
    input: {
        marginVertical: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexGrow: 'grow',
        marginBottom: 20,
    },
    optionContainer: {
        marginVertical: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    colorSliderContainer: {
        marginVertical: 10,
    },
    previewContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    sliderContainer: {
        marginBottom: 20, 
        flexDirection: 'row',
    },
});

export default InformacionUsuario;

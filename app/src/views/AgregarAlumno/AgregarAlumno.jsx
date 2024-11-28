import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import Slider from '@react-native-community/slider';
import { Input } from "@rneui/themed";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { Checkbox } from "react-native-paper";
import { postEstudiante } from "../../api/apiUsuario";
import { postImagen } from "../../api/apiImage";
import { Alert } from "react-native";

const AgregarAlumno = () => {
    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [backGroundColor, setBackGroundColor] = useState('#F8F8F8');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fontSize, setFontSize] = useState(15);
    const [urlAtras, setUrlAtras] = useState(null);
    const [opcionVisualizacion, setOpcionVisualizacion] = useState([
        {id: 1, label: "Tactil", selected: true}, 
        {id: 2, label:"Lector de pantalla", selected: false},
        {id: 3, label: "Navegación con el teclado", selected: false},
        {id: 4, label: "Lector de texto", selected: false}
        ]);
    const [prefereciasAccesibilidades, setPreferenciasAccesibilidades] = useState([
        {id: 1, label: "Texto", selected: true}, 
        {id: 2, label:"Pictorgamas", selected: false},
        {id: 3, label: "Audio", selected: false},
        {id: 4, label: "Video", selected: false}
    
    ]);
    
    const figuras = [
        {name: 'cloudy-night-outline', color: '#0DA9F6', hash: 'a1b2c3' }, 
        {name: 'extension-puzzle-outline', color: '#708090', hash: 'd4e6f1' }, 
        {name: 'flash-outline', color: '#00CED1', hash: 'abcdefdef' }, 
        {name: 'radio-button-off-outline', color: '#FF7F50', hash: '800080' }, 
        {name: 'square-outline', color: '#9B30FF', hash: 'FFA500' }, 
        {name: 'star-outline', color: '#1E90FF', hash: '008000' }, 
    ]

    const handleFigurePress = (figura) => {
        if (contraseña.length < 7 ) {
            setContraseña([...contraseña, figura]);
        }
    }

    const fetch = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
    }

    const handleSeleccionarImagenPress = async () => {
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
    }

    const eliminarUltimoElemento = () => {
        setContraseña(contraseña.slice(0, -1));
    }

    const handleColorChange = (value) => {
        const hexColor = '#' + Math.floor(value * 16777215).toString(16).padStart(6, '0');
        setBackGroundColor(hexColor);
    }

    useEffect(() => {
        fetch();
    }, []);
    
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
    }
    const comprobar = () => { 
        return nombre && apellido && nombreUsuario && contraseña.length === 7;
    }
    const handleAñadirAlumnoPress = async () => {
        const contraseñaConcatenada = contraseña.map((item) => item.hash).join('');
        let urlFotoPerfil = null; 
        if (fotoPerfil) {
            urlFotoPerfil = await postImagen({ fotoUri: fotoPerfil, nombre: nombreUsuario }); 
            if (!urlFotoPerfil) {
                Alert.alert("Error al subir la imagen.");
            }
        }
        const datosAlumno = {
            "nombre": nombre,
            "apellido": apellido,
            "nombre_usuario": nombreUsuario,
            "contraseña": contraseñaConcatenada,
            "color_fondo": backGroundColor,
            "tamaño_letra": fontSize,
            "rol": "ESTUDIANTE",
            "foto_perfil": urlFotoPerfil!==null ? urlFotoPerfil : "https://st3.depositphotos.com/3538469/15750/i/450/depositphotos_157501024-stock-photo-business-man-icon.jpg",
        };
        const resp = await postEstudiante(datosAlumno);
        if (resp) {
            Alert.alert("Alumno añadido correctamente.");
            navigation.navigate('GestionAlumnos');
        } else {
            Alert.alert("Error al añadir al alumno.");
        } 
    }
    return (
        <Layaout>
           <View style={styles.header}>
            {Platform.OS !== 'android' &&
            <TouchableOpacity onPress={() => navigation.goBack()}>
            {urlAtras &&
                <Image source={{uri: urlAtras}} style={{width:50, height: 50}}/>
            }
            </TouchableOpacity>
            }
            <Text style={styles.titleHeader}>Añadir Alumno</Text>
           </View>
           <ScrollView style={styles.body}>
                <Input style={styles.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <Input style={styles.input}
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                />
                <Input style={styles.input}
                    placeholder="Nombre de Usuario"
                    value={nombreUsuario}
                    onChangeText={setNombreUsuario}
                />
                <Button title="Seleccionar Foto de Perfil" buttonStyle={styles.button} onPress={handleSeleccionarImagenPress} />
                {fotoPerfil &&
                <View>
                    <Image source={{uri: fotoPerfil}} style={{width:100, height: 100}}/>
                    <Button title="Eliminar" buttonStyle={styles.button} onPress={() => setFotoPerfil(null)} />
                </View>
                }
                <View>
                    <Text style={styles.info}>Contraseña</Text>
                    <View >
                        <View style={styles.inputContraseña}>
                            {figuras.map((figura, index) => (
                                <Button key={index} icon={<Icon 
                                        name={figura.name}
                                        type="ionicon"
                                        color={figura.color}
                                        />}
                                        onPress={() => handleFigurePress(figura)}
                                        color='#F8F8F8'
                                        style={{borderRadius: 10, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}
                                        />
                            ))}
                        </View>
                        
                        <View style={styles.showFigure}>
                            {contraseña.map((figura, index) => (
                               <Icon key={index} name={figura.name} type="ionicon" color={figura.color}/>
                                ))
                            }
                        </View>
                       {contraseña.length >0 &&
                        <Button icon={<Icon 
                                        name="arrow-back-circle-outline"
                                        type="ionicon"
                                        />}
                                color='#F8F8F8'
                                onPress={()=>{eliminarUltimoElemento()}}
                                
                        />}   

                    </View>
                    <View>
                        <Text style={styles.info}>Opciones de visualización</Text>
                        {opcionVisualizacion.map((opcion, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox 
                                    status={opcion.selected? 'checked' : 'unchecked'}
                                    onPress={()=> toggleOption(opcion.id)}
                                />
                                <Text>{opcion.label}</Text>
                            </View>
                        ))}
                    </View>
                    <View>
                        <Text style={styles.info}>Preferencias de accesibilidad</Text>
                        {prefereciasAccesibilidades.map((preferencia, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox 
                                    status={preferencia.selected? 'checked' : 'unchecked'}
                                    onPress={()=> togglePreferenciaAccesibilidad(preferencia.id)}
                                />
                                <Text>{preferencia.label}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.sliderContainer}>
                        <View>
                            <Text style={styles.info}>Color de fondo</Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={0}
                                maximumValue={1}
                                step={0.01}
                                onValueChange={handleColorChange}
                                />
                                 <View style={{ marginLeft: 30, width: 70, height:30, backgroundColor:backGroundColor}}>
                            </View>
                            
                        </View>
                        </View>
                    </View>
                    <View style={styles.sliderContainer}>
                        <View>
                            <Text style={styles.info}>Tamaño de letra</Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={16}
                                maximumValue={25}
                                step={1}
                                value={fontSize}
                                onValueChange={(value) => setFontSize(value)}
                                />
                                <Text style={{fontSize: fontSize, marginBottom: 10, margin: 10}}>Tamaño</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {comprobar() &&
                <Button title="Añadir Alumno" buttonStyle={styles.button} onPress={()=> handleAñadirAlumnoPress()}/>}
            </ScrollView>
        </Layaout>
    )
}
const styles = StyleSheet.create({
    header: { 
        backgroundColor: '#F8F8F8',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body:{},
    input: {},
    info: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        margin: 10,
    },
    button: {
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        inputContraseña: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
    },
    inputContraseña: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        backgroundColor: '#F8F8F8',
        width: 50,
        height: 50,
        marginHorizontal: 5,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    showFigure: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 10, 
    },
    sliderContainer: {
        marginBottom: 20,
        flexDirection: 'row',
    },
})
export default AgregarAlumno;
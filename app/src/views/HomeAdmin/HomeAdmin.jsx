import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";

const HomeAdmin = ({route}) => {
    const { idAdmin } = route.params || {};

    const pictogramas = { 
        compañero: "7062/7062_2500.png",
        almacen: "24683/24683_2500.png",
        tareas: "36347/36347_2500.png",
        gestionInformacion: "39172/39172_2500.png",
        gestionComedor: "5970/5970_2500.png",
        gestionProfesores: "6556/6556_2500.png",
        tarea_juego:"27399/27399_2500.png",
    }
    const navigation = useNavigation();
    const [urlCompañeros, setUrlCompañeros] = useState(null);
    const [urlAlmacen, setUrlAlmacen] = useState(null);
    const [urlTareas, setUrlTareas] = useState(null);
    const [urlGestionInformaes, setUrlGestionInformaes] = useState(null);
    const [urlGestionComedor, setUrlGestionComedor] = useState(null);
    const [urlProfesores, setUrlProfesores] = useState(null);
    const [urlTareaJuego, setUrlTareaJuego] = useState(null);
    const fetchPictograma = async () => {
        const compañero = await obtenerPictograma(pictogramas.compañero);  // Usamos la función modularizada
        if (compañero) {
            setUrlCompañeros(compañero);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const almacen = await obtenerPictograma(pictogramas.almacen);  // Usamos la función modularizada
        if (almacen) {
            setUrlAlmacen(almacen);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const tareas = await obtenerPictograma(pictogramas.tareas);  // Usamos la función modularizada
        if (tareas) {
            setUrlTareas(tareas);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const gestionInformacion = await obtenerPictograma(pictogramas.gestionInformacion);  // Usamos la función modularizada
        if (gestionInformacion) {
            setUrlGestionInformaes(gestionInformacion);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const gestionComedor = await obtenerPictograma(pictogramas.gestionComedor);  // Usamos la función modularizada
        if (gestionComedor) {
            setUrlGestionComedor(gestionComedor);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const profesores = await obtenerPictograma(pictogramas.gestionProfesores);  // Usamos la función modularizada
        if (profesores) {
            setUrlProfesores(profesores);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const juego = await obtenerPictograma(pictogramas.tarea_juego);
        if (juego) {
            setUrlTareaJuego(juego);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
    };
    const buttons = [ 
        {title: 'Gestion de Alumnos', icon: urlCompañeros, screen: 'GestionAlumnos'}, 
        {title: 'Gestion de Inventario', icon: urlAlmacen, screen: 'GestionInventario'},
        {title: 'Gestion de Tareas por Pasos', icon: urlTareas, screen: 'GestionTareas'},
        {title: 'Gestion de Información', icon: urlGestionInformaes, screen: 'GestionInformacion'},
        {title: 'Gestion de Comedor', icon: urlGestionComedor, screen: 'GestionComedor'},
        {title: 'Gestion de Profesores', icon: urlProfesores, screen: 'GestionProfesores'},
        {title: 'Tarea de Juego', icon: urlTareaJuego, screen: 'TareaJuego'},
    ]
      useEffect(() => {
        fetchPictograma();
      }, []);
    return (
        <Layaout>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Página Principal</Text>
                <View style={styles.button}>
                    <Button
                        icon = {<Icon 
                                    name="log-out-outline"
                                    type="ionicon"
                                    color="black"
                                    />
                                }
                        color='#F8F8F8'
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.elements}> 
                        {buttons.map((button, index) => (
                            <TouchableOpacity key={index} style={styles.touchableButton} onPress={() => navigation.navigate(button.screen, {idAdmin: idAdmin})}>
                                <Image source={{uri: button.icon}} style={{width: 90, height: 90}} />
                                <Text style={styles.textButton}>{button.title}</Text>
                            </TouchableOpacity>
                        ))}            
                </View>
            </View>
        </Layaout>
    )
}
const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'flex-end',
    },
    body: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-between',
    }, 
    elements: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    }, 
    touchableButton: {
        height: 150,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 2,
        marginStart: 2,
    },
    titleButton: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        marginStart: 2,
        marginEnd: 2,
    }
});
export default HomeAdmin;
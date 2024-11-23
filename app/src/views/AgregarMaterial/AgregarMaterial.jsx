import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Input } from "@rneui/themed";
import { obtenerPictograma } from "../../api/apiArasaac";
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from "@rneui/themed";
import { postMaterial } from "../../api/apiInventario";
import { Alert } from "react-native";
import { format } from 'date-fns';

const AgregarMaterial = ({route}) => {
    const {idAdmin} = route.params || {};
    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation();
    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, 'yyyy-MM-dd');

    const [nombreMaterial, setNombreMaterial] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cantidad, setCantidad] = useState(null);
    const [fechaIngreso, setFechaIngreso] = useState(fechaFormateada);
    const [estado, setEstado] = useState('Disponible');
    const [idAdministrador, setIdAdministrador] = useState(idAdmin);
    const [urlAtras, setUrlAtras] = useState(null);


    const fetch = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
    }

    useEffect(() => {
        fetch();
    }, []);
    
    const handleAñadirMaterialPress = async () => {
        const datosMaterial = {
            "nombre_material": nombreMaterial,
            "descripcion": descripcion,
            "categoria": categoria,
            "cantidad": cantidad,
            "fecha_ingreso": fechaIngreso,
            "estado": estado,
            "id_administrador": idAdministrador,
        };

        const resp = await postMaterial(datosMaterial);

        if (resp) {
            Alert.alert("Material añadido correctamente.");
            navigation.navigate('GestionInventario', {idAdmin: idAdmin});
        } else {
            Alert.alert("Error al añadir el material.");
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
                <Text style={styles.titleHeader}>Añadir material</Text>
           </View>

           <ScrollView style={styles.body}>
                <Input style={styles.input}
                    placeholder="Nombre"
                    value={nombreMaterial}
                    onChangeText={setNombreMaterial}
                />
                <Input style={styles.input}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                />
                <Input style={styles.input}
                    placeholder="Categoría"
                    value={categoria}
                    onChangeText={setCategoria}
                />
                <Input style={styles.input}
                    placeholder="Cantidad"
                    value={cantidad}
                    onChangeText={setCantidad}
                />

                <Button title="Añadir" buttonStyle={styles.button} onPress={()=> handleAñadirMaterialPress()}/>
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

export default AgregarMaterial;
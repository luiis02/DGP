import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";

const HomeAdmin = () => {
    const pictogramas = { 
        compañero: "7062/7062_2500.png",
        almacen: "24683/24683_2500.png"
    }
    const navigation = useNavigation();
    const [urlCompañeros, setUrlCompañeros] = useState(null);
    const [urlAlmacen, setUrlAlmacen] = useState(null);
    const fetchPictograma = async () => {
        const compañero = await obtenerPictograma(pictogramas.compañero);  // Usamos la función modularizada
        if (compañero) {
            setUrlCompañeros(compañero);
        } else {
            setError("Error al obtener el pictograma.");
        }
        const almacen = await obtenerPictograma(pictogramas.almacen);  // Usamos la función modularizada
        if (almacen) {
            setUrlAlmacen(almacen);
        } else {
            setError("Error al obtener el pictograma.");
        }
    };
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
                <View> 
                    <TouchableOpacity style={styles.touchableButton}>
                        {urlCompañeros  ? (
                            <Image source={{ uri: urlCompañeros }} style={{ width: 100, height: 100 }} />) : (
                            <Text style={{ color: 'black', textAlign: 'center' }}>Gestión de alumnos</Text>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.titleButton}>Gestión de Alumnos</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.touchableButton}>
                        {urlCompañeros  ? (
                            <Image source={{ uri: urlAlmacen }} style={{ width: 100, height: 100 }} />) : (
                            <Text style={{ color: 'black', textAlign: 'center' }}>Gestión de Inventario</Text>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.titleButton}>Gestión de Inventario</Text>
                </View>
                <View>

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
        flexDirection: 'row', 
        justifyContent: 'space-between',
    }, 
    touchableButton: {
        padding: 20,
        borderRadius: 10,
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
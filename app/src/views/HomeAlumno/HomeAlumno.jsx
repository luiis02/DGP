import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { Image } from '@rneui/base';

const HomeAlumno = ({route}) => {
    const {alumno} = route.params; 
    const [urlMenu, setUrlMenu] = useState(null);
    const [tareas, setTareas] = useState([]);
    const pictograma = { 
        menu: "39110/39110_2500.png", 
    }
    const navigation = useNavigation();
    const fetchPictograma = async () => {
        const menu = await obtenerPictograma(pictograma.menu);
        if (menu) {
            setUrlMenu(menu);
        } else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    };

    useEffect(() =>{
        fetchPictograma();
    }, []);

    return (
        <SafeAreaView style={{backgroundColor: alumno.color_tema, flex: 1}}>
            <View style={styles.header}> 
                <Text style={[styles.titleHeader, {fontSize: alumno.tamaño_letra}]}>Página Principal</Text>
            </View>
            <View style={styles.body}>
                <Text style={[{fontSize:alumno.tamaño_letra}, styles.titleBody]}>Tareas Pendientes</Text>
            </View>
            <View style={styles.footer}>
                {urlMenu &&
                    <View style={styles.menufooter}>
                        <TouchableOpacity onPress={() => navigation.navigate('Menu', {alumno: alumno})}>
                            <Image source={{ uri: urlMenu }} style={styles.icon} /> 
                            <Text style={{fontSize: alumno.tamaño_letra}}>Menú</Text>   
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10,
    },
    titleHeader: {
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
    },
    titleBody: {
        fontWeight: 'bold',
        color: 'black',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    menufooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
        tintColor: 'black',
    },
});

export default HomeAlumno;
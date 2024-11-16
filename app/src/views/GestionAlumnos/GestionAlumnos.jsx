import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getEstudiantes} from "../../api/api"
import { Icon, Button } from "@rneui/themed";
const GestionAlumnos = () => {
    const pictograma = { 
        atras: "38249/38249_2500.png", 
    }
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);
    const [alumnos, setAlumnos] = useState([]);
    const fetch = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const data = await getEstudiantes(); 
        if (data) {
            setAlumnos(data);
        } else {
            Alert.alert("Error al obtener los alumnos.");
        }
    }
    useEffect(() => {
        fetch();
    }, []);
    return (
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== 'android' && 
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    {urlAtras &&
                        <Image source={{uri: urlAtras}} style={{width:50, height: 50}}/>}
                </TouchableOpacity>
}
                <Text style={styles.titleHeader}> Gestión de Alumnos</Text>
            </View>
            <View style={styles.body}>
                <ScrollView style={styles.scrollView}>
                    {alumnos.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.item} onPress={()=> navigation.navigate('InformacionUsuario',{
                            alumno: item,
                        })}>
                            <Image source={{uri: item.foto_perfil}} style={{width: 80, height: 80, borderRadius: 40}} />
                            <Text style={styles.itemText}>{item.nombre} {item.apellido}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={{alignItems: 'center'}}>
                <Button 
                    icon={<Icon 
                            name="person-add-outline"
                            type="ionicon"
                            color="black"
                            />}
                    color='#F8F8F8'
                    title = 'Añadir alumno'
                    titleStyle={{fontSize: 16, color: '#000', fontWeight: 'bold', margin: 10}}
                    onPress={() => navigation.navigate('AgregarAlumno')}
                />
            </View>
        </Layaout>     
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        flex: 1,
        flexDirection: 'row', 
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
        fontSize: 13,
        marginLeft: 10,
    },
});
export default GestionAlumnos;
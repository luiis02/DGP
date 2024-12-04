import React, { useEffect,useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert, FlatList, Input } from 'react-native'; 
import { getMenu } from '../../test/Menu';
import { getComanda } from '../../test/Comanda';
import { obtenerPictograma } from '../../api/apiArasaac';

const Comanda = ({route}) => {
    const { descripcion, aula, alumno } = route.params;
    const [listaMenu, setListaMenu] = useState([]);
    const [menu, setMenu] = useState([]);
    const [urlAtras, setUrlAtras] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const pictogramas = {
        atras: "38249/38249_2500.png",
    }
    
    const fetchMenu = () => { 
        const respuesta = getMenu();
        if(respuesta) {
            setMenu(respuesta);
        } else {
            console.error('Error al obtener el menu:', respuesta.error);
        }
    }
    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma();
        if(respuesta) {
            setUrlAtras(respuesta);
        } else {
            console.error('Error al obtener el pictograma:', respuesta.error);
        }
    }
    const renderMenu = ({item}) => (
        <View>
            <Image />
            <Input 
                placeholder="Ingrese la cantidad"
                value={item.cantidad}
                onChangeText={(text) => setCantidad(text)}
            />
        </View>

    );

    useEffect(()=>{
        fetchMenu();
     }, []);
     useEffect(()=>{
        console.log(alumno)
        console.log(aula);
     },[menu]);
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: alumno.color_tema}]}>
            {descripcion === "SIN PICTOGRAMA" ? (
                <>
                <View style={styles.header}>
                    <TouchableOpacity style={StyleSheet.buttonTouchable} onPress = {()=> Alert.alert("Atras")}>
                        <Image src={{uri: urlAtras}} style={StyleSheet.imagebutton}/>
                        <Text style={[styles.text, {fontSize: alumno.tamaño_letra}]}>Atras</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, {fontSize: alumno.tamaño_letra}]}>Aula {aula}</Text> 
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={currentMenu}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={renderMenu}
                        numColumns={1}
                        contentContainerStyle={{paddingHorizontal: 10}}
                    />
                </View>
                </>

            ): (
                <Text>Con pictograma</Text>
            )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    buttonTouchable: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagebutton: {
        width: 30,
        height: 30,
    },
    text: {
        fontWeight: 'bold',
    },
});

export default Comanda;
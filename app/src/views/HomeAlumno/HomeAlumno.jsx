import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { obtenerPictograma } from '../../api/apiArasaac';
import { Image } from '@rneui/base';
import { getAllTareas } from '../../api/apiTarea';

const HomeAlumno = ({route}) => {
    const {alumno} = route.params;
    const [urlMenu, setUrlMenu] = useState(null);
    const [tareas, setTareas] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginatedTareas, setPaginatedTareas] = useState([]);
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

    const fetchTareas = async () => {
        const response = await getAllTareas(alumno.id); 
        if (response && response.tareas) {
            // Convertir las tareas en objetos
            const tareasFormateadas = response.tareas.map(tarea => ({
                url_imagen: tarea.tareas.url_imagen,  // URL de la imagen
                screen: tarea.tareas.screen,  // Tipo de tarea (Inventario)
            }));
            setTareas(tareasFormateadas);
        } else {
            Alert.alert('Error', 'No se pudieron obtener las tareas.');
        }
    };

    // Función para dividir las tareas en páginas de tres
    const paginateTareas = (tareas) => {
        const tasksPerPage = 3;
        const pages = [];
        for (let i = 0; i < tareas.length; i += tasksPerPage) {
            pages.push(tareas.slice(i, i + tasksPerPage));
        }
        setPaginatedTareas(pages);
    };

    useEffect(() =>{
        fetchTareas();  // Fetch tareas al cargar la página
        fetchPictograma();
    }, []);

    useEffect(()=>{
        if (tareas.length > 0) {
            paginateTareas(tareas);  // Paginamos las tareas cuando se obtienen
        }
    }, [tareas]);

    const goToNextPage = () => {
        if (currentPage < paginatedTareas.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <SafeAreaView style={{backgroundColor: alumno.color_tema, flex: 1}}>
            <View style={styles.header}> 
                <Text style={[styles.titleHeader, {fontSize: alumno.tamaño_letra}]}>Página Principal</Text>
            </View>
            <View style={styles.body}>
                <Text style={[{fontSize:alumno.tamaño_letra}, styles.titleBody]}>Tareas Pendientes</Text>
                <FlatList
                    data={paginatedTareas[currentPage] || []}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.taskItem} onPress={() => navigation.navigate(item.screen, {tarea: item, alumno: alumno})}>
                            <Image source={{ uri: item.url_imagen }} style={{width: 100, height: 100, borderRadius: 5}} /> 
                            <Text style={{fontSize: alumno.tamaño_letra, marginTop: 10}}>{item.screen}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.menufooter}>
                    <TouchableOpacity onPress={goToPrevPage} disabled={currentPage === 0}>
                        <Text style={styles.navigationButton}>Anterior</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToNextPage} disabled={currentPage === paginatedTareas.length - 1}>
                        <Text style={styles.navigationButton}>Siguiente</Text>
                    </TouchableOpacity>
                </View>
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
    navigationButton: {
        fontSize: 18,
        marginHorizontal: 10,
        color: 'blue',
    },
    taskItem: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
});

export default HomeAlumno;
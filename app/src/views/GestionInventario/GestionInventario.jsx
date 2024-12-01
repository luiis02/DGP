import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Platform, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { Icon, Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import { getMateriales/*, getSolicitud*/ } from "../../api/apiInventario";
import { getPeticion } from "../../api/apiInventario";
import { getSolicitud } from "../../test/SolicitudMaterial";

const GestionInventario = ({route}) => {
    const { idAdmin } = route.params || {};

    const pictograma = { 
        atras: "38249/38249_2500.png",
        solicitud: "6518/6518_2500.png", 
    }
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);
    const [urlSolicitud, setUrlSolicitud] = useState(null);
    const [materiales, setMateriales] = useState([]);
    const [materialesFiltrados, setMaterialesFiltrados] = useState([]); // Estado para los materiales filtrados
    const [filtro, setFiltro] = useState(""); // Estado para el filtro
    const [solicitud, setSolucitud] = useState([]); //

    
    const fetchMateriales = async () => {
        const data = await getMateriales();
        setMateriales(data);
        setMaterialesFiltrados(data);
    };
    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
        const respuestaSolicitud = await obtenerPictograma(pictograma.solicitud);
        if (respuestaSolicitud) {
            setUrlSolicitud(respuestaSolicitud);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }
    };

    const existeSolicitud =  () => { 
        const data =  getSolicitud(true) //await getPeticion(); 
        if (data) {
            setSolucitud(data);
        }
    }

    useEffect(() => {
        fetchPictograma();
          fetchMateriales();
          existeSolicitud();
    }, []);
    // Función para manejar el filtro
    const handleFilterSubmit = () => {
        // Filtrar los materiales por nombre
        const datosFiltrados = materiales.filter((item) => {
            const nombre = `${item.nombre_material} ${item.cantidad}`.toLowerCase();
            return nombre.includes(filtro.toLowerCase());
        });

        // Actualizar el estado de los estudiantes filtrados
        setMaterialesFiltrados(datosFiltrados);
    }

    return (
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== 'android' && 
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {urlAtras && 
                            <Image source={{uri: urlAtras}} style={{width: 50, height: 50}} />
                        }
                    </TouchableOpacity>
                }
                <Text style={styles.titleHeader}>Gestión de Inventario</Text>
            </View>


            <View style={styles.body}>
                {/* Filtro de búsqueda */}
                <View style={styles.filtrar}>
                    <Input 
                        placeholder="Filtrar por nombre"
                        inputStyle={{alignItems: 'center'}}
                        value={filtro} // Vinculamos el estado al input
                        onChangeText={(text) => setFiltro(text)} // Actualiza el estado al escribir
                        rightIcon={
                            <TouchableOpacity onPress={handleFilterSubmit}>
                                <Icon name="search" size={24} color="black" />
                            </TouchableOpacity>
                        }
                    />
                </View>

                <View style={styles.header}>
                    <Text style={styles.headerCell}>Material</Text>
                    <Text style={styles.headerCell}>Cantidad</Text>
                    <Text style={styles.headerCell}>Estado</Text>
                </View>

                {/* Contenido de los materiales filtrados */}
                <ScrollView style={styles.scrollView}>
                    {materialesFiltrados.map((item) => (
                        <TouchableOpacity 
                            key={item.id_material} 
                            style={styles.item} 
                            onPress={() => {
                                navigation.navigate('InformacionMaterial', {material: item})
                                }
                            }
                        >
                            <Text style={styles.itemText}>{item.nombre_material}</Text>
                            <Text style={styles.itemText}>{item.cantidad}</Text>
                            <Text style={styles.itemText}>{item.estado}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            {solicitud.length > 0 && 
            <View style={styles.solicitudBoton}>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("SolicitudMaterialAdmins", {solicitudes: solicitud} )}
                    >
                    <Image source={{uri: urlSolicitud}} style={{width: 80, height: 80}}/>   
                </TouchableOpacity>
                <Text style={styles.solicitudText}>Solicitudes</Text>
            </View>
            }

            {/* Botón para añadir un nuevo material al inventario */}
            <View style={styles.footer}>
                <Button 
                    icon={<Icon 
                            name="add-circle"
                            type="ionicon"
                            color="black"
                        />}
                    color='#F8F8F8'
                    title='Añadir material'
                    titleStyle={{fontSize: 16, color: '#000', fontWeight: 'bold', margin: 10}}
                    onPress={() => navigation.navigate('AgregarMaterial', {idAdmin: idAdmin})}
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
        justifyContent: 'space-between',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body: {
        flex: 1,
        justifyContent: 'space-between', // Asegura que el contenido se distribuya de manera uniforme
    },
    filtrar: {
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
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
        flex: 1,
        fontSize: 13,
        textAlign: 'center',
    },
    solicitudBoton: {
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        flexDirection: 'column', // Asegura que el contenido esté en columna (imagen y texto)
        alignItems: 'center', // Centra la imagen y el texto
    },

    footer: {
        padding: 20,
        justifyContent: 'flex-end',  // Asegura que el botón esté alineado en la parte inferior
        alignItems: 'center',
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      solicitudText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10, // Añade un poco de espacio entre la imagen y el texto
        textAlign: 'center', // Asegura que el texto esté centrado
      },
});

export default GestionInventario;
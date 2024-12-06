import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, TextInput, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { getMateriales } from "../../api/apiInventario";
import { putMaterial } from "../../api/apiInventario";
import { postPeticion } from "../../api/apiInventario";

const SolicitudMaterial = ({route}) => {
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    };
    const { idProfesor } = route.params;
    const [urlAtras, setUrlAtras] = useState(null);
    const [materiales, setMateriales] = useState([]);
    const [materialesFiltrados, setMaterialesFiltrados] = useState([]);
    const [aula, setAula] = useState("");
    const [filtro, setFiltro] = useState("");
    
    const navigation = useNavigation();

    // Fetch pictograma
    const fetchPictograma = async () => { 
        const respuesta = await obtenerPictograma(pictogramas.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        }
    };

    // Fetch materiales
    const fetchMateriales = async () => { 
        const respuesta = await getMateriales(); 
        if (respuesta) {
            setMateriales(respuesta);
            setMaterialesFiltrados(respuesta); // Inicialmente los materiales filtrados son todos los materiales
        }
    };

    // Manejar cambio de cantidad
    const handleCantidadChange = (id, cantidad) => {
        if (cantidad > 0) {
            const nuevosMateriales = materialesFiltrados.map((material) =>
                material.id_material === id
                    ? { ...material, cantidad } // Actualizamos la cantidad del material correspondiente
                    : material // Dejamos los demás materiales igual
            );
            setMaterialesFiltrados(nuevosMateriales); // Actualizamos el estado con la nueva lista
        }
    };

    // Manejar envío de petición
    const enviarPeticion = async () => {
       // Solicitar fecha de entrega y aula usando Alert.prompt
       Alert.prompt(
        "Fecha de Entrega",
        "Por favor, ingresa la fecha de entrega en formato YYYY-MM-DD:",
        async (fechaEntrega) => {
            // Validar que la fecha esté en el formato correcto
            const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
            if (!regexFecha.test(fechaEntrega)) {
                Alert.alert("Error", "Formato de fecha inválido. Usa YYYY-MM-DD.");
                return;
            }

            // Solicitar el aula
            Alert.prompt(
                "Aula",
                "Por favor, ingresa el nombre del aula:",
                async (aula) => {
                    if (!aula) {
                        Alert.alert("Error", "Por favor, ingresa el nombre del aula.");
                        return;
                    }

                    // Crear una copia de los materiales originales con la cantidad actualizada
                    const nuevosMateriales = materiales.map((materialOriginal) => {
                        const materialSolicitado = materialesFiltrados.find(
                            (material) => material.id_material === materialOriginal.id_material
                        );
                        if (materialSolicitado) {
                            return {
                                ...materialOriginal,
                                cantidad: materialOriginal.cantidad - materialSolicitado.cantidad,
                            };
                        }
                        return materialOriginal;
                    });

                    // Enviar las solicitudes de actualización para cada material
                    for (const material of nuevosMateriales) {
                        const data = await putMaterial(material);
                        if (!data) {
                            Alert.alert("Error", "Ha ocurrido un error al actualizar el material.");
                            return;
                        }
                    }

                    // Construir el cuerpo para la solicitud
                    const peticiones = materialesFiltrados.map((material) => ({
                        id_material: material.id_material,
                        nombre: material.nombre_material,
                        cantidad: material.cantidad,
                    }));

                    const reqData = {
                        profesor_id: idProfesor,
                        aula: aula,
                        material: peticiones,
                        fecha_entrega: fechaEntrega,
                    };

                    // Realizar el POST de la solicitud
                    const resp = await postPeticion(reqData);
                    console.log(resp)
                    if (resp) {
                        Alert.alert("Solicitud enviada correctamente.");
                        setMateriales(nuevosMateriales); // Actualizar las cantidades
                        navigation.goBack(); // Volver a la pantalla anterior
                    } else {
                        Alert.alert("Error al enviar la solicitud", "Ha ocurrido un error.");
                    }
                },
                "plain-text",
                null,
                "default"
            );
        },
        "plain-text", // Tipo de entrada para fecha
        null,         // Valor por defecto
        "default"     // Tipo de teclado
        );
    };
    
    

    // Filtrar materiales según el filtro de búsqueda
    const handleFilterSubmit = () => {
        const datosFiltrados = materiales.filter((item) => {
            const nombre = `${item.nombre_material} ${item.cantidad}`.toLowerCase();
            return nombre.includes(filtro.toLowerCase());
        });
        setMaterialesFiltrados(datosFiltrados);
    };

    // Uso de useEffect para obtener datos al inicio
    useEffect(() => {
        fetchPictograma();
        fetchMateriales();
    }, []);
    useEffect(() => {
        const materialesConCantidadCero = materiales.map((material) => ({
            ...material,
            cantidad: 0, // Asegúrate de que todas las cantidades sean 0 al iniciar
        }));
        setMaterialesFiltrados(materialesConCantidadCero);
    }, [materiales]);
    return (
        <Layaout>
            {/* Header */}
            <View style={styles.header}>
                {Platform.OS !== 'android' && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {urlAtras && <Image source={{ uri: urlAtras }} style={styles.iconBack} />}
                    </TouchableOpacity>
                )}
                <Text style={styles.titleHeader}>Solicitudes de Material</Text>
            </View>
            
            {/* Filtro de búsqueda */}
            <View style={styles.filtrar}>
                <TextInput 
                    style={styles.inputBusqueda}
                    placeholder="Filtrar por nombre"
                    value={filtro}
                    onChangeText={(text) => setFiltro(text)}
                />
                <TouchableOpacity onPress={handleFilterSubmit}>
                    <Icon name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
            {/* Listado de Materiales */}
            <View style={styles.container}>
                <Text style={styles.solicitudTitle}>Listado de Materiales</Text>
                <ScrollView style={styles.materialesScroll}>
                    {materialesFiltrados.length > 0 ? (
                        materiales.map((material) => (
                            <View key={material.id_material} style={styles.material}>
                                <Text style={styles.materialName}>{material.nombre}</Text>
                                <Text style={styles.materialDescripcion}>{material.descripcion}</Text>
                                <Text style={styles.materialCantidad}>Disponible: {material.cantidad}</Text>

                                {/* Input para la cantidad */}
                                <TextInput
                                    key={material.id_material}
                                    style={styles.inputCantidad}
                                    placeholder="Cantidad"
                                    keyboardType="numeric"
                                    onChangeText={(text) => {
                                        handleCantidadChange(material.id_material, parseInt(text) || 0)}
                                        }
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noData}>No hay materiales disponibles.</Text>
                    )}
                </ScrollView>

                {/* Botón para enviar todas las peticiones */}
                <TouchableOpacity style={styles.botonEnviarGeneral} onPress={enviarPeticion}>
                    <Text style={styles.botonTextoGeneral}>Enviar Petición</Text>
                </TouchableOpacity>
            </View>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBack: {
        width: 50,
        height: 50,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    solicitudTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    materialesScroll: {
        flex: 1,
    },
    material: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    materialName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    materialDescripcion: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    materialCantidad: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    inputCantidad: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
    },
    botonEnviar: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    botonTexto: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    botonEnviarGeneral: {
        marginTop: 20,
        backgroundColor: '#28A745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    botonTextoGeneral: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noData: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    inputBusqueda: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
        flex: 1,
    },
    filtrar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    }
});

export default SolicitudMaterial;

import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";

const SolicitudMaterialAdmins = ({ route }) => { 
    const [solicitudes, setSolicitudes] = useState([]);
    const [urlAtras, setUrlAtras] = useState(null);
    const navigation = useNavigation();
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    }
    const fetcPictogramas = async () => {
        const respuesta = await obtenerPictograma(pictogramas.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        }
    }

    useEffect(() => {
        if (route.params?.solicitudes) {
            setSolicitudes(route.params.solicitudes);
        }
        fetcPictogramas();
    }, [route.params]);

    return (
        <Layaout>
            <View style={styles.container}>
                <View style={styles.header}>
                    {urlAtras && 
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={{uri: urlAtras}} style={{width: 50, height: 50}} />
                        </TouchableOpacity>
                    }
                    <Text style={styles.solicitudTitle}>Solicitudes de Material</Text>
                </View>
                
                <ScrollView>
                    {solicitudes.length === 0 && (
                        <Text style={styles.emptyMessage}>No hay solicitudes disponibles</Text>
                    )}
                    {solicitudes.map((solicitud) => (
                        <View key={solicitud.id} style={styles.solicitud}>
                            <View style={styles.solicitudHeader}>
                                <View style={styles.solicitudInfo}>
                                    <Text style={styles.profesor}>Profesor: {solicitud.profesor_nombre}</Text>
                                    <Text style={styles.aula}>Aula: {solicitud.aula}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.botonGenerarTarea}
                                    onPress={() => navigation.navigate("GenerarTareaMaterial", {solicitud: solicitud})}
                                >
                                    <Text style={styles.botonTexto}>Generar Tarea</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.materialesTitle}>Materiales:</Text>
                               { solicitud.materiales.map((material, index) => (
                                    <Text key={index} style={styles.material}>
                                        - {material.nombre_material}: {material.cantidad_solicitada}
                                    </Text>
                                ))}
                            
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    solicitudTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    solicitud: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    solicitudHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    solicitudInfo: {
        flex: 1,
    },
    profesor: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    aula: {
        fontSize: 16,
        marginBottom: 5,
    },
    botonGenerarTarea: {
        backgroundColor: "#007bff",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    botonTexto: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    materialesTitle: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
    },
    material: {
        fontSize: 14,
        marginLeft: 10,
    },
    emptyMessage: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
    },
});

export default SolicitudMaterialAdmins;

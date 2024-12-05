import React, { useEffect, useState } from "react";
import Layaout from "../../components/Layaout/Layaout";
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, Platform, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import { obtenerPictograma } from "../../api/apiArasaac";
import { postTarea } from "../../api/apiTarea";
import { getSolicitud } from "../../test/SolicitudMaterial";
import {SolicitudComanda} from "../SolicitudComanda/SolicitudComanda";

const AgregarTarea = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [urlAtras, setUrlAtras] = useState(null);
    const [fechaFin, setFechaFin] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [idEstudiante, setIdEstudiante] = useState('');
    const [solicitud, setSolicitud] = useState([]);

    // DropDownPicker State
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Tarea por pasos', value: 'pasos' },
        { label: 'Comanda', value: 'comanda' },
        { label: 'Inventario', value: 'inventario' },
    ]);

    const fechaInicio = new Date().toISOString().split('T')[0];

    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma("38249/38249_2500.png");
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }

        const solicitudData = getSolicitud(true); // Simulación de llamada a datos de solicitud
        if (solicitudData) {
            setSolicitud(solicitudData);
        }
    };

    useEffect(() => {
        fetchPictograma();
    }, []);

    const asignarTareaEstudiante = async (datos) => {
        if (!datos.id_estudiante || !datos.fecha_inicio || !datos.fecha_fin || !datos.prioridad || !value) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        try {
            const response = await postTarea(datos);
            if (response) {
                setMessage(response.message || "Tarea creada exitosamente.");
            } else {
                setMessage("Error desconocido al asignar tarea.");
            }
        } catch (error) {
            console.error("Error al asignar tarea:", error);
            setMessage("Hubo un error al conectar con el servidor.");
        }
    };

    const handleButtonPress = () => {
        if (value === 'pasos') {
            const datos = {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                prioridad,
                id_estudiante: idEstudiante,
                tipo_tarea: value,
            };
            asignarTareaEstudiante(datos);
        } else if (value === 'inventario') {
            navigation.navigate("SolicitudMaterialAdmins", { solicitudes: solicitud });
        } else {
            navigation.navigate("SolicitudComanda");
        }
    };

    return (
        <Layaout>
            <View style={styles.header}>
                {Platform.OS !== 'android' && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {urlAtras && <Image source={{ uri: urlAtras }} style={{ width: 50, height: 50 }} />}
                    </TouchableOpacity>
                )}
                <Text style={styles.titleHeader}>Añadir Tarea</Text>
            </View>

            <View style={styles.formContainer}>
                <Text>Fecha Fin:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={fechaFin}
                    onChangeText={setFechaFin}
                />

                <Text>Prioridad:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Prioridad"
                    value={prioridad}
                    onChangeText={setPrioridad}
                />

                <Text>ID Estudiante:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID Estudiante"
                    value={idEstudiante}
                    onChangeText={setIdEstudiante}
                />

                <Text>Tipo de Tarea:</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Seleccione un tipo de tarea"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                />
            </View>

            <View style={styles.botonAñadirTarea}>
                <Button
                    title="Añadir Tarea"
                    buttonStyle={styles.button}
                    onPress={handleButtonPress}
                />
            </View>
        </Layaout>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F8F8F8',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    input: {
        backgroundColor: '#F8F8F8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#B4D2E7',
    },
    dropdown: {
        backgroundColor: '#F8F8F8',
        borderWidth: 1,
        borderColor: '#B4D2E7',
    },
    dropdownContainer: {
        backgroundColor: '#F8F8F8',
    },
    button: {
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        margin: 10,
    },
    formContainer: {
        flex: 1,
        margin: 10,
    },
    botonAñadirTarea: {
        backgroundColor: '#B4D2E7',
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
});

export default AgregarTarea;

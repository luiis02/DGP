import { Text, View, StyleSheet, Alert, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { obtenerPictograma } from "../../api/apiArasaac";

const LoginProf = ({ profesores, admin }) => {
    const pictograma = {
        atras: "38249/38249_2500.png",
    }
    const navigation = useNavigation();
    const [urlAtras, setUrlAtras] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const fetchPictograma = async () => {
        const respuesta = await obtenerPictograma(pictograma.atras); 
        if (respuesta) {
            setUrlAtras(respuesta);
        }else {
            Alert.alert('Error', 'No se pudo obtener el pictograma.');
        }
    };
    useEffect(()=>{
        fetchPictograma();
    })
    // Función para validar el usuario
    const handleLogin = () => {
        const profesorEncontrado = profesores.find(
            (profesor) => profesor.nombre_usuario === username && profesor.contraseña === password
        );
        if (profesorEncontrado) {
            Alert.alert('Acceso concedido', 'Bienvenido Profesor');
            navigation.navigate('HomeProfesor', {idProfesor: profesorEncontrado.id}); // Redirige a la pantalla de administrador
        } else {
            const adminEncontrado = admin.find(
                (admin) => admin.nombre_usuario === username && admin.contraseña === password
            );
            if (adminEncontrado) {
                Alert.alert('Acceso concedido', 'Bienvenido Administrador');
                navigation.navigate('HomeAdmin', {idAdmin: adminEncontrado.id}); // Redirige a la pantalla principal de profesor
            }else {
                Alert.alert('Acceso denegado', 'Usuario o contraseña incorrectos');
            }
        }
    };
    return (
        <View>
            <View style={styles.container}>
                {Platform.OS !== 'android' &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {urlAtras && 
                        <Image source={{uri : urlAtras}} style={{width:50, height:50}}/>
                    }
                </TouchableOpacity>
                }
                <Text style={styles.title}>Inicio de Sesión</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.usuarioContainer}>
                    <Input
                        placeholder="Usuario"
                        inputStyle={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.passwordContainer}>
                    <Input
                        placeholder="Contraseña"
                        inputStyle={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Iniciar Sesión"
                    buttonStyle={{ backgroundColor: '#B4D2E7', borderRadius: 10 }}
                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                    onPress={handleLogin}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical: 20,
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    usuarioContainer: {
        borderWidth: 1,
        borderColor: '#F8F8F8',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#F8F8F8',
    },
    passwordContainer: {
        borderWidth: 1,
        borderColor: '#F8F8F8',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        padding: 10,
        color: 'black',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
});

export default LoginProf;

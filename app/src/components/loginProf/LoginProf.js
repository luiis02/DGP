import { Text, View, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Button, Icon, Input } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const LoginProf = ({ profesores, admin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation();
    
    // Función para validar el usuario
    const handleLogin = () => {
        const profesorEncontrado = profesores.find(
            (profesor) => profesor.nombre_usuario === username && profesor.contraseña === password
        );
        if (profesorEncontrado) {
            Alert.alert('Acceso concedido', 'Bienvenido Profesor');
            navigation.navigate('HomeProfesor'); // Redirige a la pantalla de administrador
        } else {
            const adminEncontrado = admin.find(
                (admin) => admin.nombre_usuario === username && admin.contraseña === password
            );
            if (adminEncontrado) {
                Alert.alert('Acceso concedido', 'Bienvenido Administrador');
                navigation.navigate('HomeAdmin'); // Redirige a la pantalla principal de profesor
            }else {
                Alert.alert('Acceso denegado', 'Usuario o contraseña incorrectos');
            }
        }
    };
    return (
        <View>
            <View style={styles.container}>
                <Button
                    icon={<Icon name="arrow-back" size={20} color="black" />}
                    color="#F8F8F8"
                    onPress={() => navigation.goBack()}
                />
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

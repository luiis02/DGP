import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import Layaout from '../../components/Layaout'
import { Button, Icon, Input } from "@rneui/themed"
import { useNavigation } from '@react-navigation/native';

const LoginProfesores = () => {
    const navigation = useNavigation(); // Importamos la función useNavigation para navegar entre pantallas
  return (
    <Layaout>
       <View style={styles.container}>
            <Button
                icon={<Icon name="arrow-back" size={20} color= 'black' />} // Ajusta el tamaño y color del ícono aquí
                color='#F8F8F8' // Color del botón
                onPress={() => navigation.goBack()} // Cuando se presione el botón, navega a la pantalla anterior
                />
            <Text style={styles.title}>Inicio de Sesión</Text>
       </View>
       <View style={styles.inputContainer}>
            <View style={styles.usuarioContainer}>
                <Input
                    placeholder='Usuario'
                    inputStyle={styles.input}
                />
            </View>
            <View style={styles.passwordContainer}>
                <Input
                    placeholder='Contraseña'
                    inputStyle={styles.input}
                    secureTextEntry={true} // Muestra la contraseña como asteriscos
                />
            </View>
       </View>
       <View style={styles.buttonContainer}>
            <Button
                title='Iniciar Sesión'
                buttonStyle={{backgroundColor: '#B4D2E7', borderRadius: 10}} // Color del botón
                titleStyle={{color: 'black', fontWeight: 'bold'}} // Color del texto del botón
             // Cuando se presione el botón, navega a la pantalla Home
            />
       </View>
    </Layaout>   
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    title:{
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical: 20,
    },
    inputContainer: {
        
    },
    usuarioContainer: {
        borderWidth: 1,
        borderColor: '#F8F8F8',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#F8F8F8', // Color de fondo del input
    },
    input: {
        padding: 10, // Espaciado interno del texto
        color: 'black', // Color del texto
    },
})
export default LoginProfesores
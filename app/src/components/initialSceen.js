import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
const InitialScreen = ({students}) => {
    const navigation = useNavigation();
  return (  
    <View style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.headerText}> GranadAccess</Text>
        </View>

        <View style={styles.buttonLogo}>

            <View style={styles.button}>
                <Button title='Profesores'  
                        color='#000'
                        onPress={() => navigation.navigate('LoginProfesor')}/>
            </View>

            <View style={styles.logo}>
                <Image source={{
                    uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrodGYJkapE34C-3kqWoDe_vz15Qof4hpRw&s`}} 
                    style={styles.image}/>
            </View>
            
        </View>

        <View>
            <Text style={styles.title}>INICIO</Text>
        </View>
        
        <View styles={styles.Studentsontainer}>
            <FlatList
                data={students}
                keyExtractor={(item) => item.id + ''}
                renderItem={(item) => {
                return (
                    <Text style={styles.students} >{item.item.nombre} {item.item.apellido}</Text>
                )}}
            />
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
        flex: 1,
        flexDirection: 'column'
    },
    header:{
        backgroundColor: '#B4D2E7', 
        paddingVertical: 20,
        alignItems: 'flex-end',
    }, 
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginEnd: 10,
    },
    buttonLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%', // Ocupa el ancho completo de la pantalla
        position: 'relative', // Permite el posicionamiento absoluto del logo
    },
    button: {
        height: 40,
        width: '110', // Ancho ajustable del botón para responsividad

        borderColor: '#000',
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        position: 'absolute',
        left: '50%', // Mueve el logo al centro del contenedor
        marginLeft: -30, // Ajusta el margen izquierdo a la mitad del ancho del logo
    },
    
    image: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    studentsontainer: {
        flex: 1,
    },
    students: {
        fontSize: 18,
        marginBottom: 10,
    },
})
export default InitialScreen
import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native'
import React from 'react'

const StudentsList = ({students}) => {
  return (  
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}> GranadAccess</Text>
        </View>
        <View style={styles.buttonLogo}>
            <View style={styles.button}>
                <Button title='Profesores' />
            </View>
            <Image source={{
                uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrodGYJkapE34C-3kqWoDe_vz15Qof4hpRw&s`}} 
                style={styles.logo}/>
        </View>
        <View>
            <FlatList
                data={students}
                keyExtractor={(item) => item.id + ''}
                renderItem={(item) => {
                return (
                    <Text>{item.item.nombre}</Text>
                )}}
            />
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8', 
    },
    header:{
        backgroundColor: '#B4D2E7', 
        width: '100%', 
        paddingVertical: 15,
        alignItems: 'flex-end',
    }, 
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212121',
        marginEnd: 12,
    },
    buttonLogo:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
    },
    button:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: '#000000',
        justifyContent: 'flex-start',
        marginRight: 20,

    },
    logo: {
        width: 60,
        height: 60, 
        alignItems: 'center',
    },
})
export default StudentsList
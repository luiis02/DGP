
import { View, Text, FlatList, StyleSheet, Image, Button, TouchableOpacity, Platform, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getEstudiantes } from '../../api/apiUsuario';
import Layaout from '../../components/Layaout/Layaout';

const Home = () => {
  const ITEMS_PER_PAGE = 8; // Cantidad de estudiantes por página
  const [currentPage, setCurrentPage] = useState(0);
  const [students, setStudents] = useState([]); // Cuando se carga la pantalla sera un array vacío
  const loadStudents =  async () => {
    try{
      const data = await getEstudiantes();
      if (data) {
        setStudents(data);
      } else {
        Alert.alert('Error al obtener los estudiantes');
      }
    }catch(error){
      throw new Error(error);
    }
  }
  const navigation = useNavigation();


  // Calcular el índice de inicio y fin para la página actual 
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = students.length > 0 ? students.slice(startIndex, endIndex):0;

  // Calcular número total de páginas
  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);

  // Manejar el cambio de página
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Renderizar cada estudiante
  const renderStudent = ({ item }) => (
    <TouchableOpacity style={styles.studentCard} onPress={()=> navigation.navigate("LoginAlumnos", {
      alumno: item}
  )}>
      <Image source={{ uri: item.foto_perfil }} style={styles.studentsImage} />
      <Text style={styles.students}>{item.nombre} {item.apellido}</Text>
    </TouchableOpacity>
  );
  useFocusEffect(
    useCallback(() => {
      loadStudents();
    }, [])
  );
  return (
    <Layaout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>GranadAccess</Text>
        </View>
        <View style={styles.buttonLogo}>
          <View style={styles.button}>
            <Button
              title="Profesores"
              color="#000100"
              testID = "Profesores"
              onPress={() => navigation.navigate('LoginProfesores')
              }
            />
          </View>
          <View style={styles.logo}>
            <Image
              source={require("../../../assets/Logo.jpeg")}
              style={styles.image}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title}>INICIO</Text>
        </View>
        { students.length > 0 &&
        <View style={styles.studentsContainer} data-testID="Estudiantes">
          <FlatList
            data={currentStudents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderStudent}
            numColumns={4} // Mostrar 4 estudiantes por fila
            contentContainerStyle={styles.list}
          />
        </View>
        }
        { students.length > 0 && 
        <View style={styles.pagination}>
          <View style={styles.button}>
            <Button title="Atrás" onPress={handlePreviousPage} disabled={currentPage === 0} />
          </View>
          <Text style={styles.pageText}>{`${currentPage + 1} / ${totalPages}`}</Text>
          <View style={styles.bbutton}>
            <Button title="Siguiente" onPress={handleNextPage} disabled={currentPage === totalPages - 1} />
          </View>
        </View>
        }
        {students .length === 0 &&
        <View style={styles.container}>
          <Text style={styles.headerText}>No hay Alumnos</Text>
        </View>
        }
      </View>
    </Layaout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  header: {
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
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 20, 
  },
  button: {
    padding: 2,
    borderRadius: 2,
    width: 110,
    height: 40,
    alignItems: 'flex-start',
  },
  logo: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  studentsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  studentCard: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  studentsImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  students: {
    fontSize: 14,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  pageText: {
    marginHorizontal: 20,
    fontSize: 16,
  },
});

export default Home;

  
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home/Home';
import HomeAdmin from './views/HomeAdmin/HomeAdmin';
import HomeProfesor from './views/HomeProfesor/HomeProfesor';
import HomeAlumno from './views/HomeAlumno/HomeAlumno';

import LoginProfesores from './views/LoginProfesores/LoginProfesores';
import LoginAlumnos from './views/LoginAlumnos/LoginAlumnos';


import AgregarAlumno from './views/AgregarAlumno/AgregarAlumno';
import InformacionUsuario from './views/InformacionUsuario/InformacionUsuario';
import Alumnos from './views/Alumnos/Alumnos';

import GestionInventario from './views/GestionInventario/GestionInventario';
import GestionAlumnos from './views/GestionAlumnos/GestionAlumnos';
import GestionTareas from './views/GestionTareas/GestionTareas';
import GestionInformacion from './views/GestionInformacion/GestionInformacion';
import GestionComedor from './views/GestionComedor/GestionComedor';

import SolicitudMaterial from './views/SolicitudMaterial/SolicitudMaterial';

import Chat from './views/Chat/Chat';



const Stack = createStackNavigator(); // Nos va a poder definir las distintas pantallas de la app

const App = () => {
  return ( 
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> 
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{headerShown: false}} />
        <Stack.Screen name="HomeProfesor" component={HomeProfesor} options={{headerShown: false}} />
        <Stack.Screen name="HomeAlumno" component={HomeAlumno} options={{headerShown: false}}/>

        <Stack.Screen name="LoginProfesores" component={LoginProfesores} options={{headerShown: false}} />
        <Stack.Screen name="LoginAlumnos" component={LoginAlumnos} options={{headerShown: false}} />

        
        <Stack.Screen name="AgregarAlumno" component={AgregarAlumno} options={{headerShown: false}} />
        <Stack.Screen name="Alumnos" component={Alumnos} options={{headerShown: false}} />
        <Stack.Screen name="InformacionUsuario" component={InformacionUsuario} options={{headerShown: false}} />

       
        <Stack.Screen name="GestionInventario" component={GestionInventario} options={{headerShown: false}} />
        <Stack.Screen name="GestionAlumnos" component={GestionAlumnos} options={{headerShown: false}} />
        <Stack.Screen name="GestionTareas" component={GestionTareas} options={{headerShown: false}} />
        <Stack.Screen name="GestionInformacion" component={GestionInformacion} options={{headerShown: false}} />
        <Stack.Screen name="GestionComedor" component={GestionComedor} options={{headerShown: false}} />

        <Stack.Screen name="SolicitudMaterial" component={SolicitudMaterial} options={{headerShown: false}} />

        <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
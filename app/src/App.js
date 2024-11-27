import React from 'react';
import 'react-native-gesture-handler';

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

import AgregarMaterial from './views/AgregarMaterial/AgregarMaterial';
import InformacionMaterial from './views/InformacionMaterial/InformacionMaterial';

import HistorialTareas from './views/HistorialTareas/HistorialTareas';

import GestionInventario from './views/GestionInventario/GestionInventario';
import GestionAlumnos from './views/GestionAlumnos/GestionAlumnos';
import GestionTareas from './views/GestionTareas/GestionTareas';
import GestionInformacion from './views/GestionInformacion/GestionInformacion';
import GestionComedor from './views/GestionComedor/GestionComedor';

import SolicitudMaterial from './views/SolicitudMaterialProfesor/SolicitudMaterialProfesor';
import SolicitudMaterialAdmins from './views/SolicitudMaterialAdmins/SolicitudMaterialAdmins';

import SolicitudComanda from './views/SolicitudComanda/SolicitudComanda';

import GenerarTareaMaterial from './views/GenerarTareaMaterial/GenerarTareaMaterial';

import Chat from './views/Chat/Chat';

import AgregarTarea from './views/AgregarTarea/AgregarTarea';

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


        <Stack.Screen name="AgregarMaterial" component={AgregarMaterial} options={{headerShown: false}} />
        <Stack.Screen name="InformacionMaterial" component={InformacionMaterial} options={{headerShown: false}} />


        <Stack.Screen name="HistorialTareas" component={HistorialTareas} options={{headerShown: false}} />

       
        <Stack.Screen name="GestionInventario" component={GestionInventario} options={{headerShown: false}} />
        <Stack.Screen name="GestionAlumnos" component={GestionAlumnos} options={{headerShown: false}} />
        <Stack.Screen name="GestionTareas" component={GestionTareas} options={{headerShown: false}} />
        <Stack.Screen name="GestionInformacion" component={GestionInformacion} options={{headerShown: false}} />
        <Stack.Screen name="GestionComedor" component={GestionComedor} options={{headerShown: false}} />

        <Stack.Screen name="SolicitudMaterial" component={SolicitudMaterial} options={{headerShown: false}} />
        <Stack.Screen name="SolicitudMaterialAdmins" component={SolicitudMaterialAdmins} options={{headerShown: false}} />

        <Stack.Screen name="SolicitudComanda" component={SolicitudComanda} options={{headerShown: false}}/>

        <Stack.Screen name="GenerarTareaMaterial" component={GenerarTareaMaterial} options={{headerShown: false}} />

        <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />
        
        <Stack.Screen name="AgregarTarea" component={AgregarTarea} options={{headerShown: false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
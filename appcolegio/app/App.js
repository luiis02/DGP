import React, { useEffect } from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/views/Home/Home';
import HomeAdmin from './src/views/HomeAdmin/HomeAdmin';
import HomeProfesor from './src/views/HomeProfesor/HomeProfesor';
import HomeAlumno from './src/views/HomeAlumno/HomeAlumno';

import LoginProfesores from './src/views/LoginProfesores/LoginProfesores';
import LoginAlumnos from './src/views/LoginAlumnos/LoginAlumnos';


import AgregarAlumno from './src/views/AgregarAlumno/AgregarAlumno';
import InformacionUsuario from './src/views/InformacionUsuario/InformacionUsuario';
import Alumnos from './src/views/Alumnos/Alumnos';

import AgregarMaterial from './src/views/AgregarMaterial/AgregarMaterial';
import InformacionMaterial from './src/views/InformacionMaterial/InformacionMaterial';

import GestionInventario from './src/views/GestionInventario/GestionInventario';
import GestionAlumnos from './src/views/GestionAlumnos/GestionAlumnos';
import GestionInformacion from './src/views/GestionInformacion/GestionInformacion';
import GestionComedor from './src/views/GestionComedor/GestionComedor';

import SolicitudMaterial from './src/views/SolicitudMaterialProfesor/SolicitudMaterialProfesor';
import SolicitudMaterialAdmins from './src/views/SolicitudMaterialAdmins/SolicitudMaterialAdmins';

import SolicitudComanda from './src/views/SolicitudComanda/SolicitudComanda';

import AgregarTarea from './src/views/AgregarTarea/AgregarTarea';
import GestionTareas from './src/views/GestionTareas/GestionTareas';

import GenerarTareaMaterial from './src/views/GenerarTareaMaterial/GenerarTareaMaterial';

import Chat from './src/views/Chat/Chat';

import HistorialTareas from './src/views/HistorialTareas/HistorialTareas';

import InformeAlumno from './src/views/InformeAlumno/InformeAlumno';

import SeleccionarIcono from './src/views/SeleccionarIcono/SeleccionarIcono';

import TareaJuego from './src/views/TareaJuego/TareaJuego';

import Menu from './src/views/Menu/Menu';

import Juego from './src/views/Juego/Juego';

import Comanda from './src/components/Comanda/Comanda';

import { Platform } from 'react-native';



const Stack = createStackNavigator(); // Nos va a poder definir las distintas pantallas de la app

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Permitir el desplazamiento en la página web
      document.body.style.overflow = 'auto';
    }
  }, []);
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

       
        <Stack.Screen name="GestionInventario" component={GestionInventario} options={{headerShown: false}} />
        <Stack.Screen name="GestionAlumnos" component={GestionAlumnos} options={{headerShown: false}} />
        <Stack.Screen name="GestionTareas" component={GestionTareas} options={{headerShown: false}} />
        <Stack.Screen name="GestionInformacion" component={GestionInformacion} options={{headerShown: false}} />
        <Stack.Screen name="GestionComedor" component={GestionComedor} options={{headerShown: false}} />

        <Stack.Screen name="SolicitudMaterial" component={SolicitudMaterial} options={{headerShown: false}} />
        <Stack.Screen name="SolicitudMaterialAdmins" component={SolicitudMaterialAdmins} options={{headerShown: false}} />

        <Stack.Screen name="SolicitudComanda" component={SolicitudComanda} options={{headerShown: false}}/>

        <Stack.Screen name="GenerarTareaMaterial" component={GenerarTareaMaterial} options={{headerShown: false}} />
        <Stack.Screen name="AgregarTarea" component={AgregarTarea} options={{headerShown: false}} />
        
        <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />

        <Stack.Screen name="HistorialTareas" component={HistorialTareas} options={{headerShown: false}} />

        <Stack.Screen name="InformeAlumno" component={InformeAlumno} options={{headerShown: false}} />
        
        <Stack.Screen name="SeleccionarIcono" component={SeleccionarIcono} options={{headerShown: false}} />

        <Stack.Screen name="TareaJuego" component={TareaJuego} options={{headerShown: false}} />

        <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}} />

        <Stack.Screen name="Juego" component={Juego} options={{headerShown: false}} />

        <Stack.Screen name="Comanda" component={Comanda} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home/Home';
import LoginProfesores from './views/LoginProfesores/LoginProfesores';

const Stack = createStackNavigator(); // Nos va a poder definir las distintas pantallas de la app

const App = () => {
  return ( 
    <NavigationContainer > 
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> 
        <Stack.Screen name= "LoginProfesor" component={LoginProfesores} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
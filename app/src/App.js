import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home/Home';

const Stack = createStackNavigator(); // Nos va a poder definir las distintas pantallas de la app

const App = () => {
  return ( 
    <NavigationContainer > 
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{headerShown: false}} // Le damos un título a la pantalla Home y le quitamos el header
          /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Importa NavigationContainer
import Home from '../views/Home/Home';
import { describe } from 'node:test';

let component
describe('<Home />', () => {

    beforeEach(() =>{
        component = render(
            <NavigationContainer>
              <Home />
            </NavigationContainer>
        )
    })
  it("Renderiza correctamente con alumnos", () => {
    expect(component.queryByText('INICIO')).toBeDefined();
  });
});

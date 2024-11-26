import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Importa NavigationContainer
import HomeAdmin from '../views/HomeAdmin/HomeAdmin'
import { describe } from 'node:test';

let component
describe('<HomeAdmin />', () => {
    beforeEach(() => {
        component = render(
            <NavigationContainer>
                <HomeAdmin />
            </NavigationContainer>
        );
    });

    it('Renderiza correctamente el componente', () => {
        expect(component.queryByText('INICIO')).toBeDefined();
    });
});
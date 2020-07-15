import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

//pgs
import Incidents from './pages/Incidents';
import Details from './pages/Details';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>                
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Details" component={Details} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}


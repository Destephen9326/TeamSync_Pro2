import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import WaitScreen from './screens/WaitScreen';
import KeyScreen from './screens/KeyScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import DashboardScreen from './screens/DashboardScreen'; 
import Camara from './screens/Camara';
import HistorialEvidencias from './screens/HistorialEvidencias';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Wait" component={WaitScreen} />
        <Stack.Screen name="Key" component={KeyScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Camara" component={Camara} />
         <Stack.Screen name="HistorialEvidencias" component={HistorialEvidencias} />

         
      </Stack.Navigator>
    </NavigationContainer>
  );
}
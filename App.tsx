import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import WaitScreen from './screens/WaitScreen';
import KeyScreen from './screens/KeyScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';


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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

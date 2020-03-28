import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/home';
import { DetailsScreen } from './screens/details';
import { ChatScreen } from './screens/chat';

const Stack = createStackNavigator();



export const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator headerMode='none' initialRouteName="Home">
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Details' component={DetailsScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

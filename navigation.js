import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/home';
import DetailsScreen from './screens/details';
import { ChatScreen } from './screens/chat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigation } from './components/tab_navigation'
import { AddScreen } from './screens/add';
import { SignInScreen } from './screens/signIn';
import { CreateAccountScreen } from './screens/createAccount'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator tabBar={props => <TabNavigation {...props} />} headerMode='none' initialRouteName="Add">
            <Tab.Screen name='CreateAccount' component={CreateAccountScreen} />
            <Tab.Screen name='SignIn' component={SignInScreen} />
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Details' component={DetailsScreen} />
            <Tab.Screen name='Chat' component={ChatScreen} />
            <Tab.Screen name='Add' component={AddScreen} />
        </Tab.Navigator>
    </NavigationContainer>
);



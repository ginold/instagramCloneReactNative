import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedScreen } from './screens/feed';
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
        <Tab.Navigator tabBar={props => <TabNavigation {...props} />} headerMode='none' >
            <Tab.Screen name='Main' component={MainScreen} />
            <Tab.Screen name='Add' component={AddScreen} />
            <Tab.Screen name='Chat' component={ChatScreen} />
        </Tab.Navigator>
    </NavigationContainer>
);

const MainScreen = () => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="Feed">
            <Stack.Screen name='Feed' component={FeedScreen} />
            <Stack.Screen name='Details' component={DetailsScreen} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} />
            <Stack.Screen name='SignIn' component={SignInScreen} />
        </Stack.Navigator>
    )
}



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import FeedScreen from './screens/feed';
import DetailsScreen from './screens/details';
import { ChatScreen } from './screens/chat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigation } from './components/tab_navigation'
import { AddScreen } from './screens/add';
import { SignInScreen } from './screens/signIn';
import { CreateAccountScreen } from './screens/createAccount'
import DrawerMenu from './components/drawer'
import { Animated, Easing } from 'react-native'
import { StoryDetail } from './screens/story_detail';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { CameraView } from './components/camera'
import { connect } from 'react-redux'
import { ImagePickerExpo } from './components/image_picker';
import { MapViewer } from './components/map_view'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackShared = createSharedElementStackNavigator();
const forFade = ({ current, closing }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});
const { multiply } = Animated;
function HorizontalSlide({
    current,
    next,
    inverted,
    layouts: { screen },
}) {
    const translateNextScreen = multiply(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [screen.width, screen.width * .2],
            extrapolate: 'clamp'
        }),
        inverted
    );
    const translateCurrentScreen = next
        ? multiply(
            next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [screen.width * -.2, -(screen.width * .8)],
                extrapolate: 'clamp'
            }),
            inverted)
        : 0;

    const overlayOpacity = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.2],
        extrapolate: 'clamp',
    });

    const shadowOpacity = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, .4],
        extrapolate: 'clamp',
    });

    return {
        cardStyle: {
            transform: [
                // Translation for the animation of the current card
                { translateX: translateCurrentScreen },
                // Translation for the animation of the card on top of this
                { translateX: translateNextScreen },
            ],
        },
        overlayStyle: { opacity: overlayOpacity },
        shadowStyle: { shadowOpacity },
    };
}

const SlideFromRightSpec = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.bezier(0.35, 0.45, 0, 1),
    },
};
const SlideFromRightAnimation = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: SlideFromRightSpec,
        close: SlideFromRightSpec,
    },
    cardStyleInterpolator: HorizontalSlide,
};
const AppNavigator = ({ user }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name='MainApp' component={MainAppScreens} />
                <Stack.Screen name='SignIn' component={SignInScreens} />
                <Stack.Screen options={{ ...TransitionPresets.ModalTransition }} name='PickImageView' component={ImagePickerExpo} />
                <Stack.Screen options={{ ...TransitionPresets.ModalTransition }} name='CameraView' component={CameraView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(AppNavigator);


const MainAppScreens = () => (
    <Tab.Navigator tabBar={props => <TabNavigation {...props} />} headerMode='none' initialRouteName='Main'>
        <Tab.Screen name='Main' component={MainScreen} />
        <Tab.Screen name='Add' component={AddScreen} />
        <Tab.Screen name='Chat' component={ChatScreen} />
    </Tab.Navigator>
)
const MainScreen = () => {
    return (
        <StackShared.Navigator headerMode='none'>
            <StackShared.Screen name='Feed' component={FeedScreen} />
            <StackShared.Screen name='Details' options={{ ...TransitionPresets.SlideFromRightIOS }} component={DetailsScreen} />
            <StackShared.Screen options={{ ...TransitionPresets.ModalTransition }} name='MapView' component={MapViewer} />
            <StackShared.Screen options={{ ...SlideFromRightAnimation }} name='DrawerMenu' component={DrawerMenu} />
            <StackShared.Screen name='StoryDetail' options={{ cardStyleInterpolator: forFade }} component={StoryDetail} />
        </StackShared.Navigator>
    )
}
const SignInScreens = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='SignIn' component={SignInScreen} />
        <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='CreateAccount' component={CreateAccountScreen} />
    </Stack.Navigator>
)

// const StoryDetailScreen = () => {
//     return (
//         <StackShared.Navigator headerMode='none'>
//             <StackShared.Screen name='StoryDetailsScreen' options={{ cardStyleInterpolator: forFade }} component={StoryDetail} />
//         </StackShared.Navigator>
//     )
// }
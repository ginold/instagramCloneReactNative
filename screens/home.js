import React from 'react';
import { Divider, Text, Layout } from '@ui-kitten/components';
import Feed from '../components/feed'
import Header from '../components/header'
import Stories from '../components/stories'
import { SafeAreaView, useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const insets = useSafeArea();
    console.log(insets)
    return (
        <SafeAreaView style={{
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingBottom: insets.bottom,
            paddingRight: insets.right,
            flex: 1
        }}>
            <Header />
            <Layout><Stories /></Layout>
            <Feed />
        </SafeAreaView >
    );
};

// import React from 'react';
// import { Divider, Text, Layout } from '@ui-kitten/components';
// import Feed from '../components/feed'
// import Header from '../components/header'
// import Stories from '../components/stories'
// import { SafeAreaView, useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';
// import { DetailsScreen } from './details';
// // import { BottomNavigationTabs } from '../components/bottom_navigation'
// import { createStackNavigator } from '@react-navigation/stack';

// export const HomeScreen = () => {
//     return (
//         <Stack.Navigator headerMode='none' >
//             <Stack.Screen name="FeedScreen" component={FeedScreen} />
//             <Stack.Screen name="Details" component={DetailsScreen} />
//         </Stack.Navigator>
//     )
// }
// export const FeedScreen = () => {
//     const insets = useSafeArea();
//     console.log(insets)
//     return (
//         <SafeAreaView style={{
//             paddingTop: insets.top,
//             paddingLeft: insets.left,
//             paddingBottom: insets.bottom,
//             paddingRight: insets.right,
//             flex: 1
//         }}>
//             <Header />
//             <Layout><Stories /></Layout>
//             <Feed />
//             {/* <BottomNavigationTabs /> */}
//         </SafeAreaView >
//     );
// };
// const Stack = createStackNavigator();







import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Fab } from '../components/fab-details'
import { SafeAreaView, useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';

export const ChatScreen = ({ navigation }) => {

    const BackIcon = (style) => {
        return <Icon {...style} name='arrow-back' />
    }
    const onBackPress = () => {
        navigation.goBack();
    };
    const BackAction = (props) => {
        return <TopNavigationAction {...props} icon={BackIcon} />
    }
    const renderLeftControl = () => (
        <BackAction onPress={onBackPress} />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Back to feed' alignment='center' leftControl={renderLeftControl()} />
            <Layout>
                <Text category='h1'>chat</Text>
            </Layout>
            <Fab />
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
})

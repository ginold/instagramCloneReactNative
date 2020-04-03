import React from 'react';
import { Layout } from '@ui-kitten/components';
import Feed from '../components/feed'
import Header from '../components/header'
import Stories from '../components/stories'
import { SafeAreaView, } from 'react-native-safe-area-context';

export const FeedScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Header />
            <Stories />
            <Feed />
        </SafeAreaView >
    );
};





import React from 'react';
import PostList from '../components/post_list'
import Header from '../components/header'
import Stories from '../components/stories'
import { SafeAreaView, } from 'react-native-safe-area-context';

export const FeedScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Header />
            <Stories />
            <PostList />
        </SafeAreaView >
    );
};





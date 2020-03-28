import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Fab } from '../components/fab-details'
import { SafeAreaView, useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';
import SliderPostPhotos from '../components/slider_post_photos'
import CardActions from '../components/post_actions';
import { Comment } from '../components/comment'

export const DetailsScreen = ({ navigation }) => {
    const [post, setPost] = React.useState({
        comments: [], author: 'a', date: new Date()
    })
    const [commentText, setCommentText] = React.useState('')
    const comment = {
        author: 'adam', content: ' tis set to true, the app will draw under the status bar. This is useful when using a semi transparent status bar color. ', date: new Date()
    }

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
            <SliderPostPhotos screen='details' style={styles.carousel} />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.detailsLayout}>

                <Layout style={styles.container}>
                    <Text>
                        As your application grows, as does its complexity. Sharing state between components quickly becomes convoluted if you don’t use an appropriate state management solution.
                        </Text>
                    <CardActions style={styles.actions} />
                    <Layout style={styles.comments}>
                        <Text category='h5'>Comments</Text>
                        <Layout style={styles.addComent}>
                            <Input
                                placeholder='Add a comment'
                                value={commentText}
                                onChangeText={text => setCommentText(text)}
                            />
                        </Layout>
                        <Comment comment={comment} />
                        <Comment comment={comment} />
                        <Comment comment={comment} />
                        <Comment comment={comment} />
                    </Layout>
                </Layout>
            </ScrollView>
            <Fab />
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: '100%'
    },
    addComent: {
        width: '100%',
        marginVertical: 10
    },
    comments: {
        alignItems: 'flex-start',
    },
})

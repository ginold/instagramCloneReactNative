import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Fab } from '../components/fab-details'
import { SafeAreaView, useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';
import SliderPostPhotos from '../components/slider_post_photos'
import { Comment } from '../components/comment'
import { TopBackNavigation } from '../components/top_back_navigation'
import PostService from '../api/posts_api'
import { connect } from 'react-redux'
import PostActions from '../components/post_actions'

const DetailsScreen = ({ navigation, route, user }) => {
    const [post, setPost] = React.useState(null)
    const [commentText, setCommentText] = React.useState('')
    React.useEffect(() => {
        setPost(route.params.post)
    }, [route.params])

    const addComment = () => {
        const comment = {
            date: Date.now(),
            text: commentText
        }
        const comments = [comment, ...post.comments]
        post.comments = comments
        setPost(post)
        setCommentText('')
        PostService.addComment(comments, post.id)
    }

    return (
        post ? <SafeAreaView style={{ flex: 1 }}>
            <TopBackNavigation navigation={navigation} />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.detailsLayout}>
                <SliderPostPhotos screen='details' pictures={post.pictures} style={styles.carousel} />

                <Layout style={styles.container}>
                    <Text style={styles.author}>{post.author.displayName}</Text>
                    <Text style={styles.description}>{post.description}</Text>

                    <PostActions key={post.id} post={post} style={styles.actions} />
                    <Layout style={styles.commentsContainer}>
                        <Text category='h5'>Comments</Text>
                        <Layout style={styles.addComent}>
                            <Input
                                placeholder='Add a comment'
                                value={commentText}
                                onChangeText={text => setCommentText(text)}
                            />
                        </Layout>
                        <Button onPress={addComment}>Add comment</Button>
                        <Layout style={styles.comments}>
                            {post.comments.map(comment => <Comment comment={comment} />)}
                        </Layout>
                    </Layout>
                </Layout>
            </ScrollView>
        </SafeAreaView > : <Text>ioewpja</Text>
    );
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(DetailsScreen)


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: '100%'
    },
    author: {
        fontWeight: 'bold'
    },
    addComent: {
        width: '100%',
        marginVertical: 10
    },
    comments: {
        width: '100%',
        marginTop: 20,
        alignItems: 'flex-start',
        flex: 1
    },
    commentsContainer: {
        alignItems: 'flex-start',
    },
})


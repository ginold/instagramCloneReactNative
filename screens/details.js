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
import Story from '../components/story'

const DetailsScreen = ({ navigation, route, user, posts }) => {
    const [post, setPost] = React.useState(route.params.post)
    const [commentText, setCommentText] = React.useState('')

    React.useEffect(() => {
        for (let p of posts) {
            if (p.id === post.id) setPost(p)
        }
    }, [posts])

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
    console.log(post.author)
    return (
        post ? <SafeAreaView style={{ flex: 1 }}>
            <TopBackNavigation navigation={navigation} />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.detailsLayout}>
                <SliderPostPhotos screen='details' pictures={post.pictures} style={styles.carousel} />

                <Layout style={styles.container}>
                    <Story avatar={post.author.avatar} />
                    <Text style={styles.author}>{post.author.displayName}</Text>
                    <Text style={styles.description}>{post.description}</Text>

                    <PostActions key={`${post.id}-details`} post={post} style={styles.actions} />
                    <Layout style={styles.commentsContainer}>
                        <Text category='h5'>Comments</Text>
                        <Layout style={styles.addComent}>
                            <Input
                                placeholder='Add a comment'
                                value={commentText}
                                onChangeText={text => setCommentText(text)}
                            />
                        </Layout>
                        <Button style={styles.addComentBtn} size='small' onPress={addComment}>Add comment</Button>
                        <Layout style={styles.comments}>
                            {post.comments.map((comment, i) => {
                                if ((i) === post.comments.length - 1) {
                                    return <Comment style={styles.commentBorder} comment={comment} />
                                }
                                return <Comment comment={comment} />
                            })}
                        </Layout>
                    </Layout>
                </Layout>
            </ScrollView>
        </SafeAreaView > : <Text>No post</Text>
    );
};
const mapStateToProps = state => {
    return {
        user: state.user,
        posts: state.posts.allPosts
    }
}
export default connect(mapStateToProps)(DetailsScreen)


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: '100%'
    },
    addComentBtn: {
        alignSelf: 'flex-end'
    },
    commentBorder: {
        backgroundColor: 'yellow',
        borderWidth: 2,
        fontSize: 30
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
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'flex-start',
        flex: 1
    },
    commentsContainer: {
        alignItems: 'flex-start',
    },
})


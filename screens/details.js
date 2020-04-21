import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Input, Layout, Text, Button, Icon } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import SliderPostPhotos from '../components/slider_post_photos'
import { Comment } from '../components/comment'
import { TopBackNavigation } from '../components/top_back_navigation'
import PostService from '../api/posts_api'
import { connect } from 'react-redux'
import PostActions from '../components/post_actions'
import Story from '../components/story'
import { slideHeight } from '../styles/sliderEntry.styles'
import moment from "moment";

const MarkerIcon = (styles) => {
    return <Icon name="pin-outline" {...styles} />
}

const DetailsScreen = ({ navigation, route, posts }) => {
    const [post, setPost] = React.useState(route.params.post)
    const [commentText, setCommentText] = React.useState('')
    const iconSize = 25
    const hasLocation = post.location && post.location.coordinates

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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? "padding" : null}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
                <TopBackNavigation navigation={navigation} from={'Feed'} />
                <ScrollView
                    keyboardShouldPersistTaps='handled'>
                    <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Story avatar={post.author.avatar} />
                            <Text style={styles.author}>{post.author.displayName}</Text>
                        </Layout>
                    </Layout>
                    <SliderPostPhotos screen='details' pictures={post.pictures} navigation={navigation} style={styles.carousel} />

                    <Layout style={styles.container}>
                        {hasLocation && <Layout style={styles.textInfoContainer}>
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Icon name='pin-outline' height={iconSize} width={iconSize} fill='grey' />
                                <Text style={{ marginLeft: 10, marginRight: 10 }}>Location: <Text style={{ fontWeight: 'bold' }}>{post.location.name}</Text></Text>
                            </Layout>
                            <Button size='small' icon={MarkerIcon} onPress={() => navigation.navigate('MapView', { location: post.location })}>View on map</Button>
                        </Layout>}

                        <Layout style={styles.textInfoContainer}>
                            <Layout style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Icon name='clock-outline' height={iconSize} width={iconSize} fill='grey' />
                                <Text style={{ marginLeft: 10 }}>Added: <Text style={{ fontWeight: 'bold' }}>{moment(post.createdAt).fromNow()}</Text></Text>
                            </Layout>
                        </Layout>

                        <Layout style={{ flexDirection: 'row' }}>
                            <Text style={styles.description}>{post.description}</Text>
                        </Layout>

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
                                        return <Comment key={`${comment.date}-id`} style={styles.commentBorder} comment={comment} />
                                    }
                                    return <Comment key={`${comment.date}-id`} comment={comment} />
                                })}
                            </Layout>
                        </Layout>
                    </Layout>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
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
        paddingTop: 10,
        width: '100%',
        minHeight: Dimensions.get('window').height - slideHeight - 100,
        flex: 1
    },
    textInfoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    addComentBtn: {
        alignSelf: 'flex-end'
    },
    commentBorder: {
        backgroundColor: 'yellow',
        borderWidth: 2,
        fontSize: 30
    },
    author: {
        marginLeft: 10,
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
    },
    commentsContainer: {
        alignItems: 'flex-start',
    },
})


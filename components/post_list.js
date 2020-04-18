import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import React from 'react';
import { List, Layout, Text } from '@ui-kitten/components';
import { Post } from './post'
import { connect } from 'react-redux'
import PostApiService from '../api/posts_api'
import PostsReduxService from '../services/post_redux_service'
import { LoadingIndicator } from './loading_indicator'

const styles = StyleSheet.create({
    loading: {
        flex: 1,
    },
    listItem: {
        marginBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        overflow: 'hidden',
        borderWidth: .2,
    },
    list: {
        flex: 1
    },
    uploading: {
        textAlign: 'center',
        marginVertical: 20,
        fontWeight: 'bold',
        color: 'chocolate'
    }
});

const PostList = (props) => {
    const [posts, setPosts] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const [uploading, setUploading] = React.useState(props.uploading)

    // console.log(props)
    React.useEffect(() => {
        console.log('new posts')
        if (props.posts.length === 0) {
            console.log('0 posts, get posts')
            PostApiService.getPosts().then((posts) => {
                PostsReduxService.setPosts(posts)
                console.log('got posts!')
                setPosts(posts)
            })
        }
        if (posts.length !== props.posts.length) {
            console.log('here')
            setPosts(props.posts)
            setUploading(false)
        }
        if (props.uploading !== uploading) setUploading(props.uploading)
    }, [props.posts, props.uploading])

    const onRefresh = () => {
        setRefreshing(true)
        setPosts([])
        PostApiService.getPosts().then(posts => {
            setPosts(posts)
            setRefreshing(false)
        })
    }

    const renderItem = ({ item, index }) => (
        <Layout style={styles.listItem} key={`${item.id}-list-item`}>
            {/* causes an error in the console, it's a known bug in ui-kitten */}
            <Post key={`${item.id}-post`} item={item} />
        </Layout>
    );
    return (
        <>
            {uploading && <Layout style={{ flex: 0.2, paddingBottom: 30 }}>
                <Text style={styles.uploading}>We're finishing the upload of your post.</Text>
                <LoadingIndicator />
            </Layout>}
            {(posts && !!posts.length && !refreshing)
                ?
                <List refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    style={styles.list} data={posts} renderItem={renderItem} />
                : <LoadingIndicator style={styles.loading} />}

        </>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts.allPosts,
        user: state.user
    }
}
export default connect(mapStateToProps)(PostList)


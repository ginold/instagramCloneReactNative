import { Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import React from 'react';
import {
    List, Layout,
} from '@ui-kitten/components';
import { CardItem } from './cardItem'
import { connect } from 'react-redux'
import PostApiService from '../api/posts_api'
import PostsReduxService from '../services/post_redux_service'

// class Feed extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { refreshing: false, posts: props.posts }
//         this.onRefresh = this.onRefresh.bind(this)
//     }
//     componentDidMount() {
//         PostApiService.getPosts().then((posts) => {
//             this.setState({ posts })
//             PostsReduxService.setPosts(posts)
//         })
//     }
//     onRefresh() {
//         this.setState({ refreshing: true, posts: [] })
//         PostApiService.getPosts().then(posts => this.setState({ posts, refreshing: false }))
//     }
//     renderItem = ({ item, index }) => {
//         return <Layout style={styles.listItem} key={`key-${index}`
//         }>
//             {/* causes an error in the console, it's a known bug in ui-kitten */}
//             <CardItem item={item} />
//         </Layout >
//     }
//     render() {
//         console.log('render feed')
//         console.log(this.state)
//         //   this.setState({ posts: this.props.posts })
//         //  const posts = this.props.posts
//         const { refreshing, posts } = this.state
//         return (
//             (posts.length > 0 && !refreshing)
//                 ? <List refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
//                     style={styles.list} data={posts} renderItem={this.renderItem.bind(this)} />
//                 : <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
//         );
//     }
// };

const styles = StyleSheet.create({
    loading: {
        flex: 1,
    },
    listItem: {
        marginVertical: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        overflow: 'hidden',
        borderWidth: .2,
    },
    list: {
    }
});

const Feed = (props) => {
    const [posts, setPosts] = React.useState(props.posts)
    const [refreshing, setRefreshing] = React.useState(false)
    const [update, setUpdate] = React.useState(false)
    //  console.log('feed')
    React.useEffect(() => {
        if (props.posts.length === 0) {
            PostApiService.getPosts().then((posts) => {
                PostsReduxService.setPosts(posts)
                setPosts(posts)
            })
        }
        if (posts.length !== props.posts.length) {
            setPosts(props.posts)
        }
    }, [props.posts])

    const onRefresh = () => {
        setRefreshing(true)
        setPosts([])
        PostApiService.getPosts().then(posts => {
            setPosts(posts)
            setRefreshing(false)
        })
    }

    const renderItem = ({ item, index }) => (
        <Layout style={styles.listItem} key={`key-${index}`}>
            {/* causes an error in the console, it's a known bug in ui-kitten */}
            <CardItem item={item} />
        </Layout>
    );
    return (
        (posts && !!posts.length && !refreshing)
            ? <List refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={styles.list} data={posts} renderItem={renderItem} />
            : <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />

    )
}

const mapStateToProps = state => {

    return {
        posts: state.posts.allPosts,
        user: state.user
    }
}
export default connect(mapStateToProps)(Feed)


// const gradient = () => {
//     return (
//         <LinearGradient
//             colors={['#B721FF', '#21D4FD']}
//             startPoint={{ x: 1, y: 0 }}
//             endPoint={{ x: 0, y: 1 }}
//             style={{
//                 flex: 1,
//                 paddingLeft: 15,
//                 paddingRight: 15,
//                 borderRadius: 5
//             }}
//         />
//     );
// }

import {
  Text, Layout, Icon
} from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PostService from '../api/posts_api'
import PostsReduxService from '../services/post_redux_service'

class PostActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = { post: {}, likes: { total: 0 } }
    this.size = 32
    this.addLike = this.addLike.bind(this)
  }
  componentDidMount() {
    console.log(this.props)
    const post = this.props.post
    this.setState({ post, likes: post.likes })
  }
  componentDidUpdate(ee, xx) {
    console.log(ee)
    console.log(xx)
  }
  addLike() {
    this.setState({ likes: this.state.likes })
    PostService.addLike(this.props.post)
  };
  render() {
    // alert(this.state.likes.total)
    const { total } = this.state.likes
    return (
      this.state.post ? <Layout style={styles.actions}>
        <TouchableOpacity >
          <Icon name={'share-outline'} style={{ marginRight: 5 }} width={this.size} height={this.size} fill='gray' />
        </TouchableOpacity>
        <TouchableOpacity >
          <Icon name={'message-circle-outline'} width={this.size} height={this.size} fill='gray' />
        </TouchableOpacity>
        <Layout style={styles.heartIcon}>
          <Text>{`${total} likes`}  </Text>
          <TouchableOpacity onPress={this.addLike}>
            <Icon name={total > 0 ? 'heart' : 'heart-outline'} width={this.size} height={this.size} fill='red' />
          </TouchableOpacity>
        </Layout>
      </Layout> : <></>
    )
  }
}
// const PostActions = (props) => {
//   const size = 30
//   const [post, setPost] = React.useState(props.post)

//   useEffect(() => {
//     console.table(post, props.post)
//     setPost(post)
//   }, [props.post])

//   const addLike = () => {
//     PostService.addLike(post).then(() => {
//       PostsReduxService.addLike(post.id)
//       post.likes.total += 1
//       setPost(post)
//     })
//   };
//   const { total } = post.likes
//   return (
//     post ? <Layout style={styles.actions}>
//       <TouchableOpacity >
//         <Icon name={'share-outline'} style={{ marginRight: 5 }} width={size} height={size} fill='gray' />
//       </TouchableOpacity>
//       <TouchableOpacity >
//         <Icon name={'message-circle-outline'} width={size} height={size} fill='gray' />
//       </TouchableOpacity>
//       <Layout style={styles.heartIcon}>
//         <Text>{`parent-> child ${total} likes`}  </Text>
//         <TouchableOpacity onPress={addLike}>
//           <Icon name={total > 0 ? 'heart' : 'heart-outline'} width={size} height={size} fill='red' />
//         </TouchableOpacity>
//       </Layout>
//     </Layout> : <></>
//   )
// }
export default PostActions

const styles = StyleSheet.create({
  actions: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  heartIcon: {
    right: 0, position: 'absolute', flexDirection: 'row',
    alignItems: 'center'
  }
})
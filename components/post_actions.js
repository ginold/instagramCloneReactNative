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
    this.size = 32
    this.post = this.props.post
    this.addLike = this.addLike.bind(this)
  }
  addLike() {
    PostService.addLike(this.post)
    PostsReduxService.addLike(this.post.id)
  };
  render() {
    const post = this.post
    return (
      <Layout style={styles.actions}>
        <TouchableOpacity >
          <Icon name={'share-outline'} style={{ marginRight: 5 }} width={this.size} height={this.size} fill='gray' />
        </TouchableOpacity>
        <TouchableOpacity >
          <Icon name={'message-circle-outline'} width={this.size} height={this.size} fill='gray' />
        </TouchableOpacity>
        <Layout style={styles.heartIcon} key={`${post.id}-heart`}>
          <Text key={`${post.id}-likes`}>{`${post.likes.total} likes`}  </Text>
          <TouchableOpacity onPress={this.addLike}>
            <Icon name={post.likes.total > 0 ? 'heart' : 'heart-outline'} width={this.size} height={this.size} fill='red' />
          </TouchableOpacity>
        </Layout>
      </Layout>
    )
  }
}
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
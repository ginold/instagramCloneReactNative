import { setPosts, addPost, addLike } from '../redux_actions/post_redux_actions';
import { myStore } from '../App'

export default class PostsReduxService {
  static setPosts = (posts) => {
    myStore.dispatch(setPosts(posts))
  }
  static addPost = (post) => {
    myStore.dispatch(addPost(post))
  }
  static addLike = (postId) => {
    myStore.dispatch(addLike(postId))
  }
  static getPosts = () => {
    return myStore.getState().posts
  }
}

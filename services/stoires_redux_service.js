import { setStories, reset } from '../redux_actions/stories_redux_actions';
import { myStore } from '../App'

export default class PostsReduxService {
  static setStories = (stories) => {
    myStore.dispatch(setStories(stories))
  }
  static reset = () => {
    myStore.dispatch(reset())
  }
}

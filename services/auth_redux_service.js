import { signIn, setUserData } from '../redux_actions/auth_redux_actions';
import { myStore } from '../App'

export default class PostsReduxService {
  static signIn = () => {
    myStore.dispatch(signIn())
  }
  static setUserData = (data) => {
    if (data) {
      myStore.dispatch(setUserData(data))
    }
  }
  static getUserData = () => {
    return myStore.getState().user
  }
}

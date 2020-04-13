import {
  signIn, setUserData, setUserConversations,
  addUserConversation, signOut
} from '../redux_actions/auth_redux_actions';
import { myStore } from '../App'

export default class AuthReduxService {
  static signIn = () => {
    myStore.dispatch(signIn())
  }
  static setUserData = (data) => {
    if (data) {
      myStore.dispatch(setUserData(data))
    }
  }
  static signOut = () => {
    myStore.dispatch(signOut())
  }
  static setUserConversations = (conversations) => {
    myStore.dispatch(setUserConversations(conversations))
  }
  static getUserConversations = () => {
    return myStore.getState().user.conversations
  }
  static addUserConversation = (conversation) => {
    myStore.dispatch(addUserConversation(conversation))
  }
  static getUserData = () => {
    return myStore.getState().user
  }
}

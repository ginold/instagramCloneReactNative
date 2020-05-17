import {
  signIn, setUserData, setUserConversations, setAddingPost,
  addUserConversation, signOut, updateUserData, setAddingToStory
} from '../redux_actions/user_redux_actions';
import { myStore } from '../App'

export default class UserReduxService {
  static signIn = () => {
    myStore.dispatch(signIn())
  }
  static setUserData = (data) => {
    console.log('set user data')
    if (data) {
      myStore.dispatch(setUserData(data))
    }
  }
  static updateUserData = (data) => {
    myStore.dispatch(updateUserData(data))
  }
  static setAddingToStory = (bool) => {
    myStore.dispatch(setAddingToStory(bool))
  }
  static setAddingPost = (bool) => {
    myStore.dispatch(setAddingPost(bool))
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

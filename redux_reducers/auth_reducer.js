import { ActionSheetIOS } from "react-native"

const user = {
  conversations: null,
  isAddingToStory: false,
  isAddingPost: false
}

export const authReducer = (state = user, action) => {
  if (action.type === "SET_USER_DATA") {
    console.log('set user data')
    return { ...state, ...action.payload, conversations: null }
  }
  if (action.type === "SIGN_IN" || action.type === "UPDATE_USER_DATA") {
    return { ...state, ...action.payload }
  }
  if (action.type === "SIGN_OUT") {
    setTimeout(() => {
      return { ...user }
    }, 1000);
  }
  if (action.type === "SET_USER_CONVERSATIONS") {
    console.log(action.payload)
    return { ...state, conversations: action.payload }
  }
  if (action.type === "SET_USER_ADDING_TO_STORY") {
    console.log(' reducer ' + action.payload)
    return { ...state, isAddingToStory: action.payload }
  }
  if (action.type === "SET_USER_ADDING_POST") {
    console.log(' reducer POST ' + action.payload)
    return { ...state, isAddingPost: action.payload }
  }

  if (action.type === "GET_USER_CONVERSATIONS") {
    return state.conversations
  }
  if (action.type === "ADD_USER_CONVERSATION") {
    console.log('add conversation', action.payload)

    const conversation = action.payload
    if (Array.isArray(state.conversations)) { // if conversations exist
      const conversations = [conversation, ...state.conversations]
      return { ...state, conversations }
    } else { // if its the first conversation
      return { ...state, conversations: [conversation] }
    }
  }
  return state;
}

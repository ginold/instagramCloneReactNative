export const setUserData = (data) => {
  return {
    type: "SET_USER_DATA",
    payload: data
  }
}
export const signIn = (data) => {
  return {
    type: "SIGN_IN",
    payload: data
  }
}
export const setAddingPost = (bool) => {
  return {
    type: "SET_USER_ADDING_POST",
    payload: bool
  }
}
export const setAddingToStory = (bool) => {
  return {
    type: "SET_USER_ADDING_TO_STORY",
    payload: bool
  }
}
export const signOut = () => {
  return {
    type: "SIGN_OUT"
  }
}
export const updateUserData = (data) => {
  return {
    type: "UPDATE_USER_DATA",
    payload: data
  }
}
export const getUserConversations = () => {
  return {
    type: "GET_USER_CONVERSATIONS"
  }
}
export const setUserConversations = (conversations) => {
  return {
    type: "SET_USER_CONVERSATIONS",
    payload: conversations
  }
}
export const addUserConversation = (conversation) => {
  return {
    type: "ADD_USER_CONVERSATION",
    payload: conversation
  }
}
const user = {
  conversations: null
}

export const authReducer = (state = user, action) => {
  if (action.type === "SET_USER_DATA") {
    console.log('set user data')
    const userData = { ...state, ...action.payload, conversations: null }
    console.log(userData)
    return userData
  }
  if (action.type === "SIGN_IN") {
    return { ...state, ...action.payload }
  }
  if (action.type === "SIGN_OUT") {
    return {}
  }
  if (action.type === "SET_USER_CONVERSATIONS") {
    console.log(action.payload)
    return { ...state, conversations: action.payload }
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

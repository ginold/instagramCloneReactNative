const userDefault = {
  conversations: null,
  isAddingToStory: false,
  isAddingPost: false,
  uid: undefined,
  displayName: undefined
}

export const userReducer = (state = userDefault, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...userDefault, ...action.payload }
    case 'SIGN_IN':
      return { ...state, ...action.payload }
    case 'SIGN_OUT':
      return { ...userDefault }
    case 'UPDATE_USER_DATA':
      return { ...state, ...action.payload }
    case 'SET_USER_CONVERSATIONS':
      return { ...state, conversations: action.payload }
    case 'SET_USER_ADDING_TO_STORY':
      return { ...state, isAddingToStory: action.payload }
    case 'SET_USER_ADDING_POST':
      return { ...state, isAddingPost: action.payload }
    case 'ADD_USER_CONVERSATION':
      const conversation = action.payload
      if (Array.isArray(state.conversations)) { // if conversations exist
        const conversations = [conversation, ...state.conversations]
        return { ...state, conversations }
      } else { // if its the first conversation
        return { ...state, conversations: [conversation] }
      }
    default:
      return state
  }
}

const user = {}

export const authReducer = (state = user, action) => {
  if (action.type === "SET_USER_DATA") {
    return { ...action.payload }
  }
  if (action.type === "SIGN_IN") {
    return { ...state, ...action.payload }
  }
  if (action.type === "SIGN_OUT") {
    return { ...state }
  }
  return state;
}

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
export const signOut = () => {
  return {
    type: "SIGN_OUT"
  }
}
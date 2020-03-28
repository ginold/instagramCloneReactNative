const settings = {
  darkTheme: false
}

export const settingsReducer = (state = settings, action) => {
  if (action.type === "SET_DARKTHEME") {
    return { ...state, darkTheme: action.payload }
  }
  return state;
}

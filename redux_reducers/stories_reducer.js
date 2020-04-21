const defaultStories = []

export const storiesReducer = (state = defaultStories, action) => {
  if (action.type === "SET_STORIES") {
    return [...action.payload]
  }
  if (action.type === "RESET") {
    return defaultStories
  }
  return state
}
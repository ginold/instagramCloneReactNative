

export const setStories = (stories) => {
  return {
    type: "SET_STORIES",
    payload: stories
  }
}
export const reset = () => {
  return {
    type: "RESET"
  }
}
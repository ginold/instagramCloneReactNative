export const addLike = (postId) => {
  return {
    type: "ADD_LIKE",
    payload: postId
  }
}
export const setPosts = (posts) => {
  return {
    type: "SET_POSTS",
    payload: posts
  }
}
export const addPost = (post) => {
  return {
    type: "ADD_POST",
    payload: post
  }
}
export const reset = () => {
  return {
    type: "RESET"
  }
}
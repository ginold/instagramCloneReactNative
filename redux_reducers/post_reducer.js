const postsDefault = {
  allPosts: []
}

export const postsReducer = (state = postsDefault, action) => {
  if (action.type === "ADD_LIKE") {
    console.log('add like')
    console.log(action)
    const postId = action.payload
    let posts = state.allPosts

    for (let i = 0; i < posts.length - 1; i++) {
      const post = posts[i];
      if (post.id === postId) {
        posts[i] = { ...post, likes: { total: post.likes.total += 1 } }
      }
    }
    return { ...state, allPosts: posts.slice() } // quick fix for props not re-rendering in the feed
  }
  if (action.type === "SET_POSTS") {
    return { ...state, allPosts: action.payload }
  }
  if (action.type === "RESET") {
    return postsDefault
  }
  if (action.type === "ADD_POST") {
    const post = action.payload // post object
    return { ...state, allPosts: [post, ...state.allPosts] }
  }
  return state
}

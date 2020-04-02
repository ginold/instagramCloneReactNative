const posts = {
  allPosts: []
}

export const postsReducer = (state = posts, action) => {
  if (action.type === "ADD_LIKE") {
    console.log('add like')
    const postId = action.payload
    console.log(state)
    let posts = state.allPosts
    posts.map(post => {
      if (post.id === postId) {
        post.likes.total += 1
      }
      return post
    })
    return { ...state, allPosts: posts.slice() } // quick fix for props not re-rendering in the feed
  }

  if (action.type === "SET_POSTS") {
    console.log('posts set')
    console.log(action.payload)
    return { ...state, allPosts: action.payload }
  }

  if (action.type === "ADD_POST") {
    const post = action.payload // post object
    const posts = state.allPosts
    return { ...state, allPosts: [post, ...state.allPosts] }
  }
  return state
}

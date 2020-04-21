const postsDefault = {
  allPosts: []
}

export const postsReducer = (state = postsDefault, action) => {
  if (action.type === "ADD_LIKE") {
    console.log('add like')
    const postId = action.payload
    console.log(state)
    let posts = state.allPosts
    posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: { total: post.likes.total += 1 } }
      }
      return post
    })
    return { ...state, allPosts: posts.slice() } // quick fix for props not re-rendering in the feed
  }
  if (action.type === "SET_POSTS") {
    console.log('posts set')
    return { ...state, allPosts: action.payload }
  }
  if (action.type === "RESET") {
    console.log('reset posts')
    return postsDefault
  }
  if (action.type === "ADD_POST") {
    const post = action.payload // post object
    return { ...state, allPosts: [post, ...state.allPosts] }
  }
  return state
}

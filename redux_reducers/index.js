import { settingsReducer } from './settings'
import { postsReducer } from './post_reducer'
import { authReducer } from './auth_reducer'
import { storiesReducer } from './stories_reducer'
import { combineReducers } from 'redux';

const allReducers = () => combineReducers({
  settings: settingsReducer,
  posts: postsReducer,
  stories: storiesReducer,
  user: authReducer
})

// when a logout action is dispatched it will reset redux state
// const rootReducer = (state, action) => {
//   console.log('qeoiwqoeij oiwjij oeiwq')
//   console.log(state, action)
//   if (action.type === 'SIGN_OUT') {
//     state = undefined;
//   }

//   return allReducers(state, action);
// };
// export default rootReducer;
export default allReducers
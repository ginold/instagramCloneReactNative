import { settingsReducer } from './settings'
import { postsReducer } from './post_reducer'
import { authReducer } from './auth_reducer'

import { combineReducers } from 'redux';

const allReducers = () => combineReducers({
  settings: settingsReducer,
  posts: postsReducer,
  user: authReducer
})

export default allReducers
import { settingsReducer } from './settings'
import { postsReducer } from './post_reducer'
import { storiesReducer } from './stories_reducer'
import { combineReducers } from 'redux';
import { userReducer } from './user_reducer';

const allReducers = () => combineReducers({
  settings: settingsReducer,
  posts: postsReducer,
  stories: storiesReducer,
  user: userReducer
})

export default allReducers;
import { settingsReducer } from './settings'

import { combineReducers } from 'redux';

const allReducers = () => combineReducers({
  settings: settingsReducer
})

export default allReducers
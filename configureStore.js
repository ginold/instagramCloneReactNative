import { applyMiddleware, compose, createStore } from 'redux'
import allReducers from './redux_reducers'
import thunk from 'redux-thunk';


export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    allReducers(),
    preloadedState,
    composeEnhancer(
      applyMiddleware(thunk),
    ),
  )

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux_reducers', () => {
      store.replaceReducer(allReducers());
    });
  }

  return store
}

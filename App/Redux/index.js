import { combineReducers } from 'redux'
import configureStore from './CreateStore'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    todos: require('./ToDosRedux').reducer
  })

  return configureStore(rootReducer)
}

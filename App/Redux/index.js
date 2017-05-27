import { combineReducers } from 'redux'
import configureStore from './CreateStore'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    startup: require('./StartupRedux').reducer
  })

  return configureStore(rootReducer)
}

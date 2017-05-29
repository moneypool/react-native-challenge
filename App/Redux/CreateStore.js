import { createStore, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'

// creates the store
export default (rootReducer) => {
    /* ------------- Redux Configuration ------------- */

  const enhancers = []

    /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  const store = createStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }

  return store
}

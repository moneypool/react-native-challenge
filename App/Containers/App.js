import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ToDoList from './ToDoList'
import createStore from '../Redux'

// create our store
const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ToDoList />
      </Provider>
    )
  }
}

export default App

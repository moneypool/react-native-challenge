import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addTask: ['task'],
  requestTasks: ['filter'],
  removeTask: ['id']
})

export const ToDosTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tasks: [],
  index: 1,
  filteredTasks: []
})

/* ------------- Reducers ------------- */

// Add task
export const add = (state, { task }) => {
  let tasks = state.tasks
  tasks.push({
    title: task,
    completed: false,
    index: state.index
  })
  return state.merge({ index: state.index + 1, tasks })
}

// Request tasks
export const request = (state, { filter }) => {
  let filteredTasks = state.tasks
  if (filter === 'Completed') filteredTasks = filter(n => n.completed, filteredTasks)
  if (filter === 'Pending') filteredTasks = filter(n => !n.completed, filteredTasks)
  return state.merge({ filteredTasks })
}

// Remove task
export const remove = (state, { id }) => {
  let tasks = filter(n => n.index !== id, state.tasks)
  state.merge({ tasks })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TASK]: add,
  [Types.REQUEST_TASKS]: request,
  [Types.REMOVE_TASK]: remove
})

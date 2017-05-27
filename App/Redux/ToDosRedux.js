import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { find, filter, propEq } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetTasks: null,
  addTask: ['task'],
  removeTask: ['index'],
  toggleCompletedTask: ['index'],
  changeFilter: ['filterBy']
})

export const ToDosTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tasks: [],
  index: 1,
  filterBy: 'All'
})

/* ------------- Reducers ------------- */

export const reset = (state) => INITIAL_STATE

// Add task
export const add = (state, { task }) => {
  const newTask = {
    title: task,
    completed: false,
    index: state.index
  }
  return state.merge({ index: state.index + 1, tasks: [...state.tasks, newTask] })
}

// Remove task
export const remove = (state, { index }) => {
  let tasks = filter(n => n.index !== index, state.tasks)
  state.merge({ tasks })
}

// Toggle complete var of task
export const toggleCompleted = (state, { index }) => {
  console.log('toggling')
  // Get task and create a new task with the completed state toggled
  const oldTask = find(propEq('index', index))(state.tasks)
  const newTask = {
    ...oldTask,
    completed: !oldTask.completed
  }
  // Remove current task from tasks
  let tasks = filter(n => n.index !== index, state.tasks)
  // Return updated tasks
  return state.merge({ tasks: [...tasks, newTask] })

}

export const changeFilter = (state, { filterBy }) => state.merge({ filterBy })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_TASKS]: reset,
  [Types.ADD_TASK]: add,
  [Types.REMOVE_TASK]: remove,
  [Types.TOGGLE_COMPLETED_TASK]: toggleCompleted,
  [Types.CHANGE_FILTER]: changeFilter
})

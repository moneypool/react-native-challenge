import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetTasks: null,
  addTask: ['task'],
  removeTask: ['id'],
  toggleCompletedTask: ['id'],
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
export const remove = (state, { id }) => {
  let tasks = filter(n => n.index !== id, state.tasks)
  state.merge({ tasks })
}

// Toggle complete var of task
export const toggleCompleted = (state, { id }) => {
  // Get task and toggle completed state
  let task = R.find(R.propEq('index', id))(state.tasks)
  task.completed = !task.completed
  // Remove current task from tasks and add updated task
  let tasks = filter(n => n.index !== id, state.tasks)
  tasks.push(task)
  // Return updated tasks
  return state.merge({ tasks })

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
